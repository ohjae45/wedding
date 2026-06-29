# TODO LIST

모바일 청첩장 추가 작업 목록. 우선순위 순으로 정리.

## 1. 카카오톡 공유 (KakaoLink) 연동

현재 **공유하기** 버튼의 동작 범위:

- **모바일 / Web Share API 지원 브라우저** → OS 기본 공유 시트가 열리며 카카오톡·메시지·메일 등으로 공유 가능. 단, 전달되는 건 **제목 + URL**뿐이고 썸네일은 받는 앱이 OG 태그를 읽어 표시.
- **데스크톱 / 미지원 브라우저** → 자동으로 **링크 복사**로 폴백.
- **링크 복사** 버튼 → 항상 현재 URL을 클립보드에 복사.

### 한계 / 해야 할 일
- [ ] 카카오톡 전용 카드형 공유(KakaoLink)는 **미연동** 상태. (`src/components/sections/Share.tsx`에 안내문만 존재)
- [ ] [카카오 디벨로퍼스](https://developers.kakao.com)에서 앱 생성 후 **JavaScript 앱 키** 발급
- [ ] 플랫폼 > Web 에 배포 도메인(`https://ohjae45.github.io`) 등록
- [ ] Kakao SDK 로드 + `Kakao.Share.sendDefault`로 제목·설명·이미지·버튼이 포함된 피드형 공유 구현
- [ ] 안내문(`카카오톡 공유는 Kakao SDK 키 발급 후 연동 예정입니다.`) 제거

## 2. 실제 정보로 교체 (현재 예시/placeholder 값)

`src/constants/wedding.ts`의 다수 값이 예시 데이터입니다.

- [ ] 신랑/신부 이름·부모님 성함 확정 및 교체
- [ ] 예식장 정확한 홀명 교체 (`hall: '4층'` → 예: `4층 그랜드홀`)
- [ ] 계좌 정보 확정 — **신랑측 부모님 계좌 추후 추가 예정**
- [ ] 연락처(전화/문자) 정보 확정

## 3. 공유 썸네일 / 메타 정보 배포 확인

- [ ] 배포(GitHub Pages) 후 OG 이미지(`og-image.jpg`) 정상 노출 확인
- [ ] 카카오톡은 OG 정보를 강하게 캐싱 → [카카오 OG 캐시 초기화](https://developers.kakao.com/tool/clear/og)로 갱신
- [ ] 하트 파비콘(`public/favicon.svg`) 브라우저 탭 표시 확인

## 4. 방명록 (Firestore) 운영 점검

- [ ] Firebase 환경변수 미설정 시 `localStorage` 폴백으로 동작 → 실제 배포에서 Firestore 설정/보안 규칙 확인
- [ ] 관리자 모드(신랑 이름 클릭 시크릿 트리거) 동작 및 방명록 삭제 권한 확인

## 5. 콘텐츠 / 이미지

- [ ] 갤러리·타임라인·About·커버 등 최종 사진 확정 및 교체
- [ ] 지도 영역(`KakaoMap`) 실제 지도/길찾기 연동 여부 확인
