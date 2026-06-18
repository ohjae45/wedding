import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@utils/firebase';

export interface GuestEntry {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

const COLLECTION = 'guestbook';
const LOCAL_KEY = 'wedding-guestbook';
const LOCAL_EVENT = 'guestbook-local-change';

/** 현재 저장 모드 — Firebase config 가 있으면 'firebase', 없으면 'local' */
export const guestbookMode: 'firebase' | 'local' = isFirebaseConfigured && db ? 'firebase' : 'local';

// ---- localStorage fallback -------------------------------------------------
function readLocal(): GuestEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as GuestEntry[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(entries: GuestEntry[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event(LOCAL_EVENT));
}

// ---- public API ------------------------------------------------------------

/** 방명록 목록 구독 (최신순). 해제 함수를 반환합니다. */
export function subscribeGuestbook(cb: (entries: GuestEntry[]) => void): () => void {
  if (guestbookMode === 'firebase' && db) {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snap) => {
        cb(
          snap.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              name: String(data.name ?? ''),
              message: String(data.message ?? ''),
              createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : 0,
            };
          }),
        );
      },
      (err) => {
        console.error('[guestbook] 구독 오류 — Firestore 생성/규칙을 확인하세요.', err);
        cb([]);
      },
    );
  }

  const emit = () => cb(readLocal());
  emit();
  window.addEventListener(LOCAL_EVENT, emit);
  return () => window.removeEventListener(LOCAL_EVENT, emit);
}

/** 방명록 등록 (이름 + 내용) */
export async function addGuestEntry(input: { name: string; message: string }): Promise<void> {
  if (guestbookMode === 'firebase' && db) {
    await addDoc(collection(db, COLLECTION), {
      name: input.name,
      message: input.message,
      createdAt: serverTimestamp(),
    });
    return;
  }

  const entries = readLocal();
  writeLocal([
    {
      id: `${Date.now()}-${entries.length}`,
      name: input.name,
      message: input.message,
      createdAt: Date.now(),
    },
    ...entries,
  ]);
}

/** 방명록 삭제 (관리자 모드에서 사용) */
export async function removeGuestEntry(entry: GuestEntry): Promise<void> {
  if (guestbookMode === 'firebase' && db) {
    await deleteDoc(doc(db, COLLECTION, entry.id));
    return;
  }
  writeLocal(readLocal().filter((e) => e.id !== entry.id));
}
