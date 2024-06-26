<template>
  <v-card style="height: 100vh">
    <v-layout class="fill-height">
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("toolbar_title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-web" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title
                ><v-btn @click="switchToArabic" style="box-shadow: none"
                  >العربية</v-btn
                ></v-list-item-title
              >
              <v-list-item-title
                ><v-btn @click="switchToEnglish" style="box-shadow: none"
                  >English</v-btn
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-account" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn @click="logout" style="box-shadow: none">Logout</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        permanent
        theme="dark"
      >
        <v-list
          nav
          v-model:selected="selectedStage as readonly unknown[]"
          mandatory
        >
          <v-list-item
            prepend-icon="mdi-brush-outline"
            :title="$t('stage.sketch')"
            value="sketch"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-file-find"
            :title="$t('stage.sketch_review')"
            value="sketch_review"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-clock-start"
            :title="$t('stage.awaiting_client_approval')"
            value="awaiting_client_approval"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-pencil-ruler"
            :title="$t('stage.execution_stage')"
            value="execution_stage"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-tab-search"
            :title="$t('stage.autocad_review')"
            value="autocad_review"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-printer"
            :title="$t('stage.ready_to_print')"
            value="ready_to_print"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-signature-freehand"
            :title="$t('stage.validate_sign_review_copy')"
            value="validate_sign_review_copy"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-tooltip-check-outline"
            :title="$t('stage.ready_to_collect')"
            value="ready_to_collect"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-hand-extended-outline"
            :title="$t('stage.client_received_copy')"
            value="client_received_copy"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-file-edit-outline"
            :title="$t('stage.edit_client_notes')"
            value="edit_client_notes"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-license"
            :title="$t('stage.license_issuance')"
            value="license_issuance"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-check-outline"
            :title="$t('stage.ready_for_final_receipt')"
            value="ready_for_final_receipt"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-clipboard-check-outline"
            :title="$t('stage.completed_projects')"
            value="completed_projects"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-sleep"
            :title="$t('stage.inactive_projects')"
            value="inactive_projects"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <h2
          style="text-align: center; padding: 5px 0"
          :class="{ 'tracking-in-expand': animateStageText }"
        >
          {{ $t("stage." + selectedStage[0]) }} -
          {{ rowData.value.length }}
        </h2>
        <div style="display: flex; align-items: center">
          <ActionButtons :gridOptions="gridOptions" />
          <AddAttachment class="inline-component" />
        </div>
        <ag-grid-vue
          class="ag-theme-alpine"
          :columnDefs="gridOptions.columnDefs"
          :rowData="rowData.value"
          :defaultColDef="defaultColDef"
          :rowSelection="rowSelection"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
          @selection-changed="onSelectionChanged"
          animateRows="true"
          :autoSizeStrategy="autoSizeStrategy"
          style="height: 50%"
        >
        </ag-grid-vue>
        <AddProject />
        <v-overlay :model-value="overlay" class="align-center justify-center">
          <svg
            class="pl"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="hsl(193,90%,55%)" />
                <stop offset="100%" stop-color="hsl(223,90%,55%)" />
              </linearGradient>
            </defs>
            <circle
              class="pl__ring"
              r="56"
              cx="64"
              cy="64"
              fill="none"
              stroke="hsla(0,10%,10%,0.1)"
              stroke-width="16"
              stroke-linecap="round"
            />
            <path
              class="pl__worm"
              d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
              fill="none"
              stroke="url(#pl-grad)"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="44 1111"
              stroke-dashoffset="10"
            />
          </svg>
        </v-overlay>
      </v-main>
    </v-layout>
  </v-card>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, watch, reactive, onMounted, onBeforeMount, h } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GridOptions } from "ag-grid-community";
import ActionButtons from "@/components/ActionButtons.vue";
import AddAttachment from "@/components/AddAttachment.vue";
import Attachments from "@/components/Attachments.vue";
import MessageCount from "@/components/Comments.vue";
import AddProject from "@/components/AddProject.vue";
import Footer from "@/components/Footer.vue";
import { useStore } from "@/store/app";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t, locale } = useI18n();
const API_URL = import.meta.env.VITE_API_URL;
const getProjects = API_URL + "/projects/";
const localFile = "../../public/myData.json";
const autoSizeStrategy = ref<any>(null); // Need to test this
const animateStageText = ref(false);
const store = useStore();
const overlay = ref(false);
const router = useRouter();

const switchToArabic = () => {
  locale.value = "ar";
};
const switchToEnglish = () => {
  locale.value = "en";
};

const selectedStage: any = ref({});
selectedStage.value = ["sketch"];

const drawer = ref(true);
// const isSelectedRows = ref(false);
// const isSingleSelect = ref(false);

const newRowClass = ref("addRow");
const progress_status = ["", "Working on it", "Done", "Hold", "Not required"];
const sketch_design_progress = [
  "",
  "الدور الأرضي",
  "الدور الأول",
  "الدور الثاني",
  "الدور الثالث",
  "الملحق",
  "الواجهة",
  "الميزانين",
];
const typeof_follow_up = ["", "ورقي", "موقع بلدي"];
const project_types = [
  t("destruction"),
  t("restoration"),
  t("add_floors"),
  t("addition"),
  t("new"),
];
const use_types = [
  t("entertaining"),
  t("agricultural"),
  t("residential_commercial"),
  t("commercial"),
  t("residential"),
];
const payment_stages = [
  t("stage.sketch"),
  t("stage.sketch_review"),
  t("stage.awaiting_client_approval"),
  t("stage.execution_stage"),
  t("stage.autocad_review"),
  t("stage.ready_to_print"),
  t("stage.validate_sign_review_copy"),
  t("stage.ready_to_collect"),
  t("stage.client_received_copy"),
  t("stage.edit_client_notes"),
  t("stage.license_issuance"),
  t("stage.ready_for_final_receipt"),
  t("stage.completed_projects"),
];

const gridApi = ref<any>();

// store the api for later use
const onGridReady = (params: any) => {
  gridApi.value = params.api;
};

const allColDef: any = [
  {
    headerName: t("project_name"),
    field: "project_name",
    width: 250,
    pinned: "left",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
  },
  {
    headerName: "📁",
    field: "attachments",
    cellRenderer: Attachments,
    width: 55,
    pinned: "left",
    cellDataType: "number",
    editable: false,
    sortable: false,
    filter: false,
  },
  {
    headerName: "📩",
    field: "comments",
    cellRenderer: MessageCount,
    width: 55,
    pinned: "left",
    cellDataType: "number",
    editable: false,
    sortable: false,
    filter: false,
  },
  { headerName: t("design_eng_name"), field: "design_eng_name" },
  { headerName: t("client_phone"), field: "client_phone" },
  {
    headerName: t("contract_sign_date"),
    field: "contract_sign_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("project_type"),
    field: "project_type",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: project_types },
  },
  {
    headerName: t("use_type"),
    field: "use_type",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: use_types },
  },
  { headerName: t("project_number"), field: "project_number" },
  { headerName: t("land_number"), field: "land_number" },
  { headerName: t("plan_number"), field: "plan_number" },
  { headerName: t("land_area"), field: "land_area" },
  { headerName: t("project_location"), field: "project_location" },
  { headerName: t("floor_numbers"), field: "floor_numbers" },
  { headerName: t("facades_numbers"), field: "facades_numbers" },
  {
    headerName: t("project_receipt_date"),
    field: "project_receipt_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("sketch_approval_date"),
    field: "sketch_approval_date",
    cellDataType: "dateString",
  },
  { headerName: t("investor_affiliation"), field: "investor_affiliation" },
  {
    headerName: t("typeof_follow_up"),
    field: "typeof_follow_up",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: typeof_follow_up },
  },
  {
    headerName: t("columns_approval_date"),
    field: "columns_approval_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("modification_price"),
    field: "modification_price",
    cellDataType: "number",
  },
  { headerName: t("obstacles"), field: "obstacles" },
  { headerName: t("project_value"), field: "project_value" },
  { headerName: t("first_payment"), field: "first_payment" },
  {
    headerName: t("first_payment_date"),
    field: "first_payment_date",
    cellDataType: "dateString",
  },
  { headerName: t("second_payment"), field: "second_payment" },
  {
    headerName: t("second_payment_date"),
    field: "second_payment_date",
    cellDataType: "dateString",
  },
  { headerName: t("third_payment"), field: "third_payment" },
  {
    headerName: t("third_payment_date"),
    field: "third_payment_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("first_payment_stage"),
    field: "first_payment_stage",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: payment_stages },
  },
  {
    headerName: t("second_payment_stage"),
    field: "second_payment_stage",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: payment_stages },
  },
  {
    headerName: t("third_payment_stage"),
    field: "third_payment_stage",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: payment_stages },
  },
  {
    headerName: t("architecture_status"),
    field: "architecture_status",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: progress_status },
  },
  { headerName: t("architect_name"), field: "architect_name" },
  {
    headerName: t("architect_start_date"),
    field: "architect_start_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("architect_delivery_date"),
    field: "architect_delivery_date",
    cellDataType: "dateString",
  },
  { headerName: t("architect_stop_reason"), field: "architect_stop_reason" },
  {
    headerName: t("construction_status"),
    field: "construction_status",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: progress_status },
  },
  { headerName: t("construction_eng"), field: "construction_eng" },
  {
    headerName: t("construction_start_date"),
    field: "construction_start_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("construction_delivery_date"),
    field: "construction_delivery_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("construction_stop_reason"),
    field: "construction_stop_reason",
  },
  {
    headerName: t("plumbing_status"),
    field: "plumbing_status",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: progress_status },
  },
  { headerName: t("plumbing_eng"), field: "plumbing_eng" },
  {
    headerName: t("plumbing_start_date"),
    field: "plumbing_start_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("plumbing_delivery_date"),
    field: "plumbing_delivery_date",
    cellDataType: "dateString",
  },
  { headerName: t("plumbing_stop_reason"), field: "plumbing_stop_reason" },
  {
    headerName: t("electrical_status"),
    field: "electrical_status",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: progress_status },
  },
  { headerName: t("electrical_eng"), field: "electrical_eng" },
  {
    headerName: t("electrical_start_date"),
    field: "electrical_start_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("electrical_delivery_date"),
    field: "electrical_delivery_date",
    cellDataType: "dateString",
  },
  { headerName: t("electrical_stop_reason"), field: "electrical_stop_reason" },
  {
    headerName: t("receive_final_copy_date"),
    field: "receive_final_copy_date",
    cellDataType: "dateString",
  },
  { headerName: t("architecture_review"), field: "architecture_review" },
  { headerName: t("architecture_reviewer"), field: "architecture_reviewer" },
  { headerName: t("construction_review"), field: "construction_review" },
  { headerName: t("construction_reviewer"), field: "construction_reviewer" },
  { headerName: t("plumbing_review"), field: "plumbing_review" },
  { headerName: t("plumbing_reviewer"), field: "plumbing_reviewer" },
  { headerName: t("electrical_review"), field: "electrical_review" },
  { headerName: t("electrical_reviewer"), field: "electrical_reviewer" },
  {
    headerName: t("client_received_review_copy_date"),
    field: "client_received_review_copy_date",
    cellDataType: "dateString",
  },
  {
    headerName: t("received_review_copy_from_client_date"),
    field: "received_review_copy_from_client_date",
    cellDataType: "dateString",
  },
  { headerName: t("corrector_name"), field: "corrector_name" },
  {
    headerName: t("corrector_date"),
    field: "corrector_date",
    cellDataType: "dateString",
  },
];

const colDef: any = ref([]);

const gridOptions: GridOptions<any> = {
  columnDefs: colDef.value,

  // EVENTS
};

let myHeaders = new Headers();
// myHeaders.append("Authorization", `Token ${store.token}`);

const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
  onCellValueChanged: (params: any) => {
    overlay.value = true;
    let formdata = new FormData();
    formdata.append("stage", params.data.stage);
    formdata.append(params.colDef.field, params.newValue);

    let requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_URL}/projects/${params.data.id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error))
      .finally(() => (overlay.value = false));
  },
};

onBeforeMount(() => {
  autoSizeStrategy.value = {
    type: "fitCellContents",
  };
});

watch(locale, () => {
  // Function to update the headerName
  const updateHeaderName = () => {
    // Update the headerName
    gridOptions?.columnDefs?.forEach((columnDef: any) => {
      columnDef.headerName = t(columnDef.field);
    });

    // Refresh the header
    if (gridApi) {
      gridApi.value.setColumnDefs(gridOptions.columnDefs);
    }
  };

  updateHeaderName();
});

const rowSelection = ref("multiple");

// Define an interface for the objects in the array
interface Project {
  stage: number;
  project_name: string;
  architectural_status: string;
  structural_status: string;
  plumbing_status: string;
  electrical_status: string;
  sketch_approval_date: string;
  columns_approval_date: string;
  typeof_follow_up: string;
  investor_affiliation: string;
  project_receipt_date: string;
  project_type: string;
  land_number: string;
  land_area: string;
  project_location: string;
  project_number: string;
  sketch_design_progress_status: string;
  structural_eng_name: string;
  structural_design_start_date: string;
  structural_review: string;
  structural_delivery_date: string;
  electrical_eng_name: string;
  electrical_design_start_date: string;
  electrical_delivery_date: string;
  architectural_drawing_start_date: string;
  architectural_delivery_date: string;
  plumbing_design_start_date: string;
  plan_delivery_date: string;
  modification_price: number;
  deed: string;
  identity: string;
  land_survey: string;
  soil_test: string;
  client_form: string;
  old_license: string;
  civil_defense: string;
  water_authority: string;
  design_eng: string;
  client_number: string;
  client_phone: string;
  design_eng_name: string;
}

const rowData = store.rowData;

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

onMounted(() => {
  overlay.value = true;
  fetch(`${API_URL}/table_views/${stagesIDs[selectedStage.value]}`, { headers: myHeaders })
  .then((result) => result.json())
  .then((remoteRowData) => {
    colDef.value = allColDef.filter((col: any) => remoteRowData.view.includes(col.field));
    
    // Chain the second fetch within the first 'then' block
    return fetch(`${API_URL}/projects/?stage=${stagesIDs[selectedStage.value]}`, { headers: myHeaders });
  })
  .then((result) => result.json())
  .then((filteredRowData) => {
    rowData.value = filteredRowData;
    return store.setSelectedStage(selectedStage);
  })
  .finally(() => {
    overlay.value = false;
    gridApi.value.autoSizeAllColumns(false);
  });
});

watch(colDef, (newValue: any[]) => {
  gridOptions.columnDefs = newValue;
});

const onSelectionChanged = () => {
  const selectedNodes = gridApi.value.getSelectedNodes() || [];
  const selectedRows = selectedNodes.map((node: any) => node.data);
  const selectedIds = selectedNodes.map((node: any) => node.data.id);
  const selectedNames = selectedNodes.map(
    (node: any) => node.data.project_name
  );

  if (selectedNodes.length > 0) {
    store.setSelectedRows(selectedRows);
    store.setSelectedIDs(selectedIds);
    store.setSelectedNames(selectedNames);
  } else {
    store.setSelectedIDs([]);
  }
};

watch(selectedStage, (newValue, oldValue) => {
  // isSelectedRows.value = false; // Reset to hide Action Buttons
  // isSingleSelect.value = false; // Reset to hide Add Attachment
  animateStageText.value = true;
  // gridOptions.api?.showLoadingOverlay();
  overlay.value = true;
  console.log(stagesIDs[selectedStage.value]);
  fetch(`${API_URL}/table_views/${stagesIDs[selectedStage.value]}`)
  .then((result) => result.json())
  .then((remoteRowData) => {
    colDef.value = allColDef.filter((col: any) => remoteRowData.view.includes(col.field));
    
    // Chain the second fetch within the first 'then' block
    return fetch(`${API_URL}/projects/?stage=${stagesIDs[selectedStage.value]}`, { headers: myHeaders });
  })
  .then((result) => result.json())
  .then((filteredRowData) => {
    rowData.value = filteredRowData;
    return store.setSelectedStage(selectedStage);
  })
  .finally(() => {
    overlay.value = false;
    gridApi.value.autoSizeAllColumns(false);
  });
  setTimeout(() => {
    animateStageText.value = false;
  }, 1000);
});

const logout = () => {
  store.setLoggedIn(false);
  store.setToken("");
  router.push({ path: "/login" });
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic&display=swap");

body {
  font-family: "Noto Kufi Arabic", sans-serif;
}

.inline-component {
  display: inline-block;
}

.addRow {
  border: 2px black solid;
  width: 100%;
  padding: 5px;
}

.ag-header,
.ag-advanced-filter-header {
  background-color: #aad2fc91;
}

.ag-row-odd {
  background-color: #f5f9ff;
}

.v-list-item--nav .v-list-item-title {
  font-weight: bold;
  overflow: visible;
  font-size: 0.7rem !important;
}

.ag-header-cell-resize::after {
  background-color: #6293ea;
}

/* Spinner */
.pl,
.pl__worm {
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

.pl {
  animation-name: bump;
  animation-timing-function: linear;
  width: 8em;
  height: 8em;
}

.pl__worm {
  animation-name: worm;
  animation-timing-function: cubic-bezier(0.42, 0.17, 0.75, 0.83);
}

/* Animations */
@keyframes bump {
  from,
  42%,
  46%,
  51%,
  55%,
  59%,
  63%,
  67%,
  71%,
  74%,
  78%,
  81%,
  85%,
  88%,
  92%,
  to {
    transform: translate(0, 0);
  }

  44% {
    transform: translate(1.33%, 6.75%);
  }

  53% {
    transform: translate(-16.67%, -0.54%);
  }

  61% {
    transform: translate(3.66%, -2.46%);
  }

  69% {
    transform: translate(-0.59%, 15.27%);
  }

  76% {
    transform: translate(-1.92%, -4.68%);
  }

  83% {
    transform: translate(9.38%, 0.96%);
  }

  90% {
    transform: translate(-4.55%, 1.98%);
  }
}

@keyframes worm {
  from {
    stroke-dashoffset: 10;
  }

  25% {
    stroke-dashoffset: 295;
  }

  to {
    stroke-dashoffset: 1165;
  }
}
</style>
