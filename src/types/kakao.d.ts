/* eslint-disable @typescript-eslint/no-explicit-any */
// 카카오맵 JS SDK 는 동적 로드되므로 window.kakao 를 느슨하게 선언합니다.
export {};

declare global {
  interface Window {
    kakao: any;
  }
}
