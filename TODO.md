# 모바일 청첩장 — 남은 작업 정리

> 현재 상태: `toourguest.com/preview/porto` 레이아웃 + 애니메이션 재현 완료, 모든 이미지/텍스트는 **예시(placeholder)**.
> 최종 목표: 내용·에셋 채운 뒤 **GitHub Pages(github.io)로 배포**.

범례: `[ ]` 미완 · `[~]` 일부만(placeholder) · `[x]` 완료

---

## 0. 가장 먼저 정해야 할 것 (의사결정)

- [ ] **배경음악 곡 선정** (저작권 확인 필수 — 아래 4번)
- [ ] **방명록 저장 방식 결정**: 그대로 둘지(localStorage) / 서버 연동(Firebase·Supabase 등)
- [ ] **지도 제공사 결정**: 카카오맵 / 네이버지도
- [ ] **카카오톡 공유 사용 여부** (사용 시 Kakao 개발자 키 발급 필요)
- [ ] **GitHub 저장소 이름** 결정 → 배포 `base` 경로에 영향 (아래 5번)

---

## 1. 웨딩 사진 (가장 중요 · 별도 신경)

준비되는 대로 placeholder를 실제 `<img>`로 교체. **권장: 미리 압축 + WebP 변환** (모바일 로딩 속도).

| 위치 | 파일/컴포넌트 | 비율 | 권장 크기 | 비고 |
| --- | --- | --- | --- | --- |
| 커버 배경 | [Cover.scss](src/components/sections/Cover.scss) `.cover__photo` | 세로 (2:3) | 1080×1620↑ | 전체 화면. 인물이 화면 정중앙/하단에 오도록 |
| 사진 띠 | [PhotoBand.tsx](src/components/sections/PhotoBand.tsx) | 4:5 | 1080×1350 | 전체 폭 1장 |
| 신랑/신부 소개 | [About.tsx](src/components/sections/About.tsx) | 1:1 | 800×800 | 2장 |
| 타임라인 | [Timeline.tsx](src/components/sections/Timeline.tsx) | 4:3 | 800×600 | `TIMELINE` 개수만큼(현재 4장) |
| 갤러리 | [Gallery.tsx](src/components/sections/Gallery.tsx) | 1:1(썸네일) | 썸네일 600×600 / 원본 1200↑ | `GALLERY_COUNT`(현재 9) 조정 |
| 공유 썸네일 | [index.html](index.html) `og:image` | 1.91:1 | 1200×630 | 카톡/SNS 미리보기 |
| 파비콘 | `public/` + index.html | 1:1 | 192×192 | 선택 |

체크리스트:
- [ ] 원본 사진 수급 & 셀렉
- [ ] 리사이즈 + 압축(WebP) → `public/images/` 또는 `src/assets/images/`에 배치
- [ ] 각 컴포넌트의 `ImagePlaceholder`/배경을 실제 이미지로 교체
- [ ] `alt` 텍스트 입력 (접근성)
- [ ] 갤러리 lazy-load + (원하면) 길게 눌러 저장 방지

---

## 2. 텍스트/정보 입력 (코드 X, 데이터만)

전부 [src/constants/wedding.ts](src/constants/wedding.ts) 한 파일에서 수정.

- [~] 신랑·신부 이름 / 영문명 / 관계(`GROOM`, `BRIDE`)
- [~] 양가 부모님 성함 (`GROOM_PARENTS`, `BRIDE_PARENTS`)
- [~] **예식장 상세 주소·홀명** (`VENUE` — 현재 `○○로 00`·`3층 그랜드볼룸`이 예시)
- [~] 오시는 길/교통 안내 (`DIRECTIONS` — 지하철·버스·주차 모두 예시)
- [~] 계좌번호 (`GROOM_ACCOUNTS`, `BRIDE_ACCOUNTS`)
- [~] 연락처 (`CONTACTS`)
- [~] 인사말 (`GREETING`)
- [~] 소개·타임라인 문구 (`ABOUT`, `TIMELINE`)
- [x] 예식 일시 (`WEDDING_DATE` = 2026-10-03 13:20) ✓ 확정
- [x] 예식장명 (`VENUE.name` = 분당엔스퀘어) ✓ 확정

---

## 3. 기능 연동 (지금은 동작 흉내만)

- [ ] **지도 임베드** — 현재 네이버 검색 링크 + placeholder.
  - 카카오/네이버 지도 SDK로 실제 지도 표시 + `VENUE.lat/lng` 좌표 입력
  - **길찾기 딥링크** 버튼(카카오맵·네이버지도·티맵 앱 열기) — *에셋/키 없이 지금 가능*
- [ ] **카카오톡 공유** — [Share.tsx](src/components/sections/Share.tsx). Kakao JS SDK 키 발급 → 제목·썸네일·버튼 카드 전송 *(키 필요)*
- [ ] **방명록 저장소** — [Guestbook.tsx](src/components/sections/Guestbook.tsx). 현재 `localStorage`라 **작성자 본인에게만** 보임. 하객 공유하려면 백엔드 + 삭제 비밀번호 *(저장소 선택 필요)*
- [ ] **계좌 카카오페이 송금** — `Account` 타입에 `kakaopayUrl` 필드 있음. 링크 넣으면 버튼 노출
- [ ] **일정 추가 버튼** — "캘린더에 추가"(.ics / Google Calendar 링크) — *지금 가능*

---

## 4. 배경음악 (별도 신경)

- [ ] **곡 선정 + 저작권 확인** — 상업/무료 음원(예: 유료 라이선스, 저작권 free 음원) 사용. 시중 가요는 무단 사용 시 문제 소지
- [ ] 음원 파일(mp3/aac)을 `public/bgm.mp3` 등에 배치
- [ ] [MusicToggle.tsx](src/components/common/MusicToggle.tsx)의 `BGM_SRC`에 경로 입력 → 토글 즉시 동작
- [ ] **모바일 자동재생 정책 주의**: 브라우저가 소리 자동재생을 막음 → 사용자가 토글(또는 첫 탭) 시 재생되도록 유지 (현재 구조 OK)
- [ ] 볼륨/페이드 인 등 디테일(선택)

---

## 5. 배포 — GitHub Pages (github.io)

> Vite SPA + 라우터 없음 → 비교적 단순. HTTPS 기본 제공이라 **클립보드 복사·공유 API도 정상 동작**(현재 http 로컬에선 폴백).

### 5-1. 사전 설정
- [ ] GitHub 저장소 생성 & 코드 push (이 폴더는 아직 git init 안 됨 → `git init` 필요)
- [ ] **`vite.config.ts`에 `base` 설정**
  - 프로젝트 페이지(`github.io/저장소명/`) → `base: '/저장소명/'`
  - 사용자 페이지(`사용자명.github.io`) → `base: '/'`
- [ ] (push 시 자동검증되도록) `git init` 후 `pnpm prepare` → Husky pre-push 훅 활성화

### 5-2. 배포 방법 (둘 중 택1)
- [ ] **(권장) GitHub Actions** — main push 시 자동 빌드·배포 워크플로(`.github/workflows/deploy.yml`) 추가, repo Settings → Pages → Source: GitHub Actions
- [ ] **(수동) gh-pages** — `pnpm build` 후 `dist/`를 `gh-pages` 브랜치에 push (`gh-pages` 패키지 또는 수동)

### 5-3. 배포 후 점검
- [ ] 실제 github.io URL에서 이미지/폰트 경로 깨짐 없는지 (base 경로 문제 자주 발생)
- [ ] 모바일 기기(아이폰 Safari / 안드로이드 Chrome) 실제 확인
- [ ] 카톡으로 링크 보냈을 때 썸네일(og:image) 정상 노출
- [ ] 클립보드 복사·공유·전화/문자 링크 동작

---

## 6. 품질 / 최적화 (배포 전 권장)

- [ ] **폰트 최적화** — 한글 `Noto Serif KR`는 용량이 큼. 서브셋 또는 `display=swap` 유지(현재 적용됨), 가능하면 로컬 호스팅
- [ ] 이미지 최적화(압축·WebP·적정 해상도) — 1번과 연계
- [ ] 메타 태그/SEO — title, description, og:* (이미지 준비 후)
- [ ] 반응형 점검 — 노치/홈바, `100svh` 동작, 작은 화면(320px) 깨짐 여부
- [ ] 접근성 — 이미지 alt, 버튼 aria-label(상당수 적용됨), 색 대비

---

## 7. 선택 기능 (원본 완성도 ↑)

- [ ] **인트로 오버레이** — 첫 진입 시 이름+날짜가 떴다 사라지는 연출(porto류 공통)
- [ ] **RSVP(참석 의사 전달)** — 참석 여부·인원·식사 수집 폼(+저장소)
- [ ] 갤러리 스와이프 제스처
- [ ] 방문 통계(선택)

---

### 지금 바로(에셋·키 없이) 진행 가능한 것
- 3번: 길찾기 딥링크, 일정(.ics) 추가 버튼
- 5번: `base` 설정 + GitHub Actions 배포 워크플로 준비
- 7번: 인트로 오버레이, RSVP 폼 UI

### 외부 입력이 필요한 것
- 사진/음원(1·4번), 카카오 키(3번 공유), 지도 키·좌표(3번), 방명록 저장소(3번), 실제 텍스트(2번)
