import { create } from "zustand";
import axios from "axios";

type State = {
  sessions: any[];
  advancedSessions: any[];
  selectedSessionId: number | null;

  messages: any[];
  selectedMessage: any;

  loadingMessages: boolean;

  setSessions: (sessions: any[]) => void;
  setAdvancedSessions: (sessions: any[]) => void;
  setSelectedSessionId: (id: number) => void;
  setSelectedMessage: (msg: any) => void;

  loadSessionMessages: (sessionId: number) => Promise<void>;
};

export const useCertificationResultsStore = create<State>((set) => ({
  sessions: [],
  advancedSessions: [],
  selectedSessionId: null,

  messages: [],
  selectedMessage: null,

  loadingMessages: false,

  setSessions: (sessions) => set({ sessions }),

  setAdvancedSessions: (sessions) =>
    set({ advancedSessions: sessions }),

  setSelectedSessionId: (id) =>
    set({ selectedSessionId: id }),

  setSelectedMessage: (msg) =>
    set({ selectedMessage: msg }),

  loadSessionMessages: async (sessionId) => {
    try {
      set({
        loadingMessages: true,
        messages: [],
        selectedMessage: null,
      });

      const res = await axios.get(
        `/api/rest/simulation/session/${sessionId}`
      );

      const msgs = res.data?.messages || [];

      set({
        messages: msgs,
        selectedMessage: msgs[0] || null,
      });
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      set({ loadingMessages: false });
    }
  },
}));