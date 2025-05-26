import { create } from "zustand";

type sidebarType = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
};


const useSidebar = create<sidebarType>((set) => ({
  showSidebar: true,

  setShowSidebar: (showSidebar: boolean) => set({ showSidebar }),
}));

export { useSidebar, type sidebarType };