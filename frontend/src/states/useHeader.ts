import { create } from "zustand";



type headerType = {
  workerType: String;
  workerName: string;
  appLocation: String;
  showHeader: boolean;

  setWorkerType: (workerType: string) => void;
  setWorkerName: (workerName: string) => void;
  setAppLocation: (appLocation: string) => void;
  setShowHeader: (showHeader: boolean) => void;
}

const useHeader = create<headerType>((set) => ({
  workerType: "Admin",
  workerName: "Alton Maseko",
  appLocation: "Home / ",
  showHeader: true,

  setWorkerType: (workerType: string) => set({ workerType }),
  setWorkerName: (workerName: string) => set({ workerName }),
  setAppLocation: (appLocation: string) => set({ appLocation }),
  setShowHeader: (showHeader: boolean) => set({ showHeader })
}));

export { useHeader, type headerType }