import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Alias, UserConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** dev/build 설정에서 공통으로 사용하는 경로 alias를 한 곳에서 관리합니다. */
const sharedAlias: Alias[] = [
  { find: '@components', replacement: path.resolve(__dirname, './src/components') },
  { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
  { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
  { find: '@stores', replacement: path.resolve(__dirname, './src/stores') },
  { find: '@constants', replacement: path.resolve(__dirname, './src/constants') },
  { find: '@images', replacement: path.resolve(__dirname, './src/assets/images') },
  { find: '@scss', replacement: path.resolve(__dirname, './src/assets/scss') },
];

/** 공통 Vite 설정은 base에서 만들고 환경별 파일에서는 필요한 옵션만 덧붙입니다. */
export function createBaseViteConfig(): UserConfig {
  return {
    plugins: [react()],
    resolve: {
      alias: sharedAlias,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@scss/mixins.scss" as mixin;`,
        },
      },
    },
  };
}
