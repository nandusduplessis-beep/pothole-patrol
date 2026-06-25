import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CaseFile } from "@/data/seed";

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
  activeWardId: string | null;
  setActiveWard: (wardId: string | null) => void;
  localCases: CaseFile[];
  addLocalCase: (c: CaseFile) => void;
  verdicts: Record<string, { asshole: number; goodhole: number }>;
  castVerdict: (candidateId: string, verdict: "asshole" | "goodhole") => void;
  myVerdicts: Record<string, "asshole" | "goodhole">;
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
      activeWardId: null,
      setActiveWard: (wardId) => set({ activeWardId: wardId }),
      localCases: [],
      addLocalCase: (c) => {
        const others = get().localCases.filter((x) => x.id !== c.id);
        set({ localCases: [c, ...others].slice(0, 25) });
      },
      verdicts: {},
      myVerdicts: {},
      castVerdict: (candidateId, verdict) => {
        const v = get().verdicts;
        const prevMine = get().myVerdicts[candidateId];
        const cur = v[candidateId] ?? { asshole: 0, goodhole: 0 };
        const next = { ...cur };
        // If changing vote, decrement previous
        if (prevMine && prevMine !== verdict && next[prevMine] > 0) {
          next[prevMine] = next[prevMine] - 1;
        }
        if (prevMine !== verdict) {
          next[verdict] = (next[verdict] ?? 0) + 1;
        }
        set({
          verdicts: { ...v, [candidateId]: next },
          myVerdicts: { ...get().myVerdicts, [candidateId]: verdict },
        });
      },
    }),
    {
      name: "stophole-state-v1",
      storage: isBrowser ? createJSONStorage(() => localStorage) : undefined,
      partialize: (s) => ({
        theme: s.theme,
        recent: s.recent,
        activeWardId: s.activeWardId,
        localCases: s.localCases,
        verdicts: s.verdicts,
        myVerdicts: s.myVerdicts,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && isBrowser) {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    },
  ),
);