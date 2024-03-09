// Utilities
import { defineStore } from 'pinia';
import { reactive } from "vue";

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    selectedStageID: null,
    selectedIDs: reactive<number[]>([]),
    selectedNames: reactive<string[]>([]),
    selectedRows: reactive<any[]>([]),
    rowData: reactive({
      value: [],
    })
  }),
  actions: {
    setSelectedStage(item: any) {
      const stagesIDs: any = {
        sketch: 1,
        sketch_review: 2,
        approve_before_columns: 3,
        awaiting_client_approval: 4,
        execution_stage: 5,
        autocad_review: 6,
        ready_to_print: 7,
        validate_sign_review_copy: 8,
        ready_to_collect: 9,
        client_received_copy: 10,
        edit_client_notes: 11,
        ready_for_final_receipt: 12,
        awaiting_completion_of_plans: 13,
        completed_projects: 14,
        inactive_projects: 15,
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
  },
});
