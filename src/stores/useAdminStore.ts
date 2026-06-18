import { create } from 'zustand';

interface AdminState {
  /** 관리자 모드 활성화 여부 (새로고침 시 초기화) */
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  setAdmin: (isAdmin) => set({ isAdmin }),
}));
