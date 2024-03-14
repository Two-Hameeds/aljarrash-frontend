// Utilities
import { defineStore } from 'pinia';
import { reactive } from "vue";

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    selectedStageID: 0,
    selectedIDs: reactive<number[]>([]),
    selectedNames: reactive<string[]>([]),
    selectedRows: reactive<any[]>([]),
    rowData: reactive({
      value: [],
    }),
    loggedIn: localStorage.getItem('loggedIn') === 'true' ? true : false,
    token: localStorage.getItem('token') || '',
  }),
  getters: {  
    // Getters are like computed properties but for stores
    // you need to reuse selectedRows to get selectedIDs and selectedNames

    // getSelectedStageID(): number {
    //   return this.selectedStageID;
    // },
    // getSelectedIDs(): number[] {
    //   return this.selectedIDs;
    // },
    // getSelectedNames(): string[] {
    //   return this.selectedNames;
    // },
  },
  actions: {
    setSelectedStage(item: any) {
      const stagesIDs: any = {
        sketch: 1,
        sketch_review: 2,
        awaiting_client_approval: 3,
        execution_stage: 4,
        autocad_review: 5,
        ready_to_print: 6,
        validate_sign_review_copy: 7,
        ready_to_collect: 8,
        client_received_copy: 9,
        edit_client_notes: 10,
        license_issuance: 11,
        ready_for_final_receipt: 12,
        completed_projects: 13,
        inactive_projects: 14,
      };

      this.selectedStageID = stagesIDs[item.value[0]];

    },
    setRowData(newRowData: any) {
      this.rowData.value = newRowData;
    },
    setSelectedIDs(newSelectedIDs: number[]) {
      this.selectedIDs = [...newSelectedIDs];
    },
    setSelectedNames(newSelectedNamess: string[]) {
      this.selectedNames = [...newSelectedNamess];
    },
    setSelectedRows(newSelectedRows: any[]) {
      this.selectedRows = [...newSelectedRows];
    },
    setLoggedIn(newLoggedIn: boolean) {
      this.loggedIn = newLoggedIn;
      localStorage.setItem('loggedIn', newLoggedIn.toString());
    },
    setToken(newToken: string) {
      this.token = newToken;
      localStorage.setItem('token', newToken);
    },
  },
});
