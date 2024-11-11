import {create} from "zustand";

export type RecordStore = {
  record: any;
  updatedRecords(data: any): void;
  removeAllRecords: () => void;
};

export type UpdateTable = {
  tableData: any;
  updateTableData(data: any): void;
};

const useStore = create<RecordStore & UpdateTable>()((set) => ({
  record: "",
  tableData: "",
  removeAllRecords: () => set({record: ""}),
  updatedRecords: (data: any) => {
    set(() => ({record: data}));
  },
  updateTableData: (data: any) => {
    set(() => ({tableData: data}));
  },
}));

export default useStore;
