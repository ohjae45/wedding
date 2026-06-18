import { create } from 'zustand';

interface MusicState {
  playing: boolean;
  toggle: () => void;
  setPlaying: (playing: boolean) => void;
}

/** 배경음악 재생 상태 (아직 곡이 정해지지 않아 토글 UI만 동작) */
export const useMusicStore = create<MusicState>((set) => ({
  playing: false,
  toggle: () => set((state) => ({ playing: !state.playing })),
  setPlaying: (playing) => set({ playing }),
}));
