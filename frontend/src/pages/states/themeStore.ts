import { create } from 'zustand';


interface ThemeStore {
  mainBlue: string;
  bondiBlue: string;
  lightBlue: string;
  blackBrown: string;
  redBrown: string;


  setmainBlue: (color: string) => void;
  setLightBlue: (color: string) => void;
  setBlackBrown: (color: string) => void;
  setBondiBlue: (color: string) => void;
  setRedBrown: (color: string) => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  mainBlue: '#00A6FB',
  bondiBlue: '#298EB0',
  lightBlue: '#ABDBF6',
  blackBrown: '#2D3319',
  redBrown: '#45062e',

  setmainBlue: (color: string) => set({ mainBlue: color }),
  setLightBlue: (color: string) => set({ lightBlue: color }),
  setBlackBrown: (color: string) => set({ blackBrown: color }),
  setBondiBlue: (color: string) => set({ bondiBlue: color }),
  setRedBrown: (color: string) => set({ redBrown: color })
}));

export default useThemeStore;
