/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 카카오맵 JavaScript 키 */
  readonly VITE_KAKAO_MAP_KEY?: string;
  /** Firebase 웹 앱 config */
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  /** 관리자 모드 비밀번호 (방명록 글 삭제) */
  readonly VITE_ADMIN_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
