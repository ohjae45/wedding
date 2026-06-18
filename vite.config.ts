import { defineConfig, mergeConfig } from 'vite';
import { createBaseViteConfig } from './vite.config.base';

export default defineConfig(
  mergeConfig(createBaseViteConfig(), {
    // GitHub Pages 프로젝트 페이지(/저장소명/) 에서도 자산 경로가 깨지지 않도록 상대경로 사용.
    // 라우터가 없는 단일 페이지라 './' 로 충분합니다. (저장소 이름 몰라도 동작)
    base: './',
    server: {
      port: 5173,
      host: true,
    },
  }),
);
