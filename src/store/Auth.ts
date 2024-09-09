import {create} from "zustand";

export interface RecordStore {
  record: any;
  updatedRecords(data: any): void;
  removeAllRecords: () => void;
}

const useStore = create<RecordStore>((set) => ({
  record: "",
  removeAllRecords: () => set({record: ""}),
  updatedRecords: (data: any) => {
    set(() => ({record: data}));
  },
}));

export default useStore;
