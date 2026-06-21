import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface RecentCase {
  caseId: string;
  openedAt: number;
}

interface StopholeState {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  toggleTheme: () => void;
  recent: RecentCase[];
  trackCase: (caseId: string) => void;
}

const isBrowser = typeof window !== "undefined";

export const useStopholeStore = create<StopholeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => {
        if (isBrowser) document.documentElement.setAttribute("data-theme", theme);
        set({ theme });
      },
      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        get().setTheme(next);
      },
      recent: [],
      trackCase: (caseId) => {
        const now = Date.now();
        const existing = get().recent.filter((r) => r.caseId !== caseId);
        const next = [{ caseId, openedAt: now }, ...existing].slice(0, 8);
        set({ recent: next });
      },
    }),
    {
      name: "stophole-state-v1",
      storage: isBrowser ? createJSONStorage(() => localStorage) : undefined,
      partialize: (s) => ({ theme: s.theme, recent: s.recent }),
      onRehydrateStorage: () => (state) => {
        if (state && isBrowser) {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    },
  ),
);