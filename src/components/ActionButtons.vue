<template>
  <div>
    <v-tooltip :text="$t('moveTo')">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          style="margin: 5px"
          icon="mdi-file-move-outline"
          @click="moveDialog = true"
          :class="{
            'bounce-in-top': triggerAnimation,
            hidden: !triggerAnimation,
          }"
        />
        <v-dialog v-model="moveDialog" width="30vw" height="60vh">
          <v-card>
            <v-form @submit.prevent="moveTo">
              <v-card-title class="text-center">
                <div class="text-h5">{{ selectedNames }}</div>
                <div>{{ $t("moveTo") }}</div>
              </v-card-title>
              <v-card-text style="direction: rtl">
                <v-select
                  v-model="selectedMoveStage"
                  :rules="moveToRules"
                  clearable
                  :label="$t('projectStage')"
                  prepend-icon="mdi-file-move-outline"
                  :items="items"
                  item-title="text"
                  item-value="value"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="blue"
                  variant="tonal"
                  @click="moveDialog = false"
                  >{{ $t("close") }}</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  type="submit"
                  color="green"
                  variant="tonal"
                  class="mt-2"
                  >{{ $t("ok") }}</v-btn
                >
              </v-card-actions>
            </v-form>
            <v-progress-linear
              :indeterminate="loading"
              color="green"
            ></v-progress-linear>
          </v-card>
        </v-dialog>
      </template>
    </v-tooltip>
    <v-tooltip top :text="$t('copyTo')">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          style="margin: 5px"
          icon="mdi-content-copy"
          @click="copyDialog = true"
          :class="{
            'bounce-in-top': triggerAnimation,
            hidden: !triggerAnimation,
          }"
        />
        <v-dialog v-model="copyDialog" width="30vw" height="60vh">
          <v-card>
            <v-form @submit.prevent="copyTo">
              <v-card-title class="text-center">
                <div class="text-h5">{{ selectedNames }}</div>
                <div>{{ $t("copyTo") }}</div>
              </v-card-title>
              <v-card-text style="direction: rtl">
                <v-select
                  v-model="selectedMoveStage"
                  :rules="moveToRules"
                  clearable
                  :label="$t('projectStage')"
                  prepend-icon="mdi-file-move-outline"
                  :items="items"
                  item-title="text"
                  item-value="value"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="blue"
                  variant="tonal"
                  @click="copyDialog = false"
                  >{{ $t("close") }}</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  type="submit"
                  color="green"
                  variant="tonal"
                  class="mt-2"
                  >{{ $t("ok") }}</v-btn
                >
              </v-card-actions>
            </v-form>
            <v-progress-linear
              :indeterminate="loading"
              color="green"
              height="10"
              striped
            ></v-progress-linear>
          </v-card>
        </v-dialog>
      </template>
    </v-tooltip>
    <v-tooltip :text="$t('delete')">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          style="margin: 5px"
          icon="mdi-delete"
          @click="deleteProj"
          :class="{
            'bounce-in-top': triggerAnimation,
            hidden: !triggerAnimation,
          }"
        />
      </template>
    </v-tooltip>
    <v-dialog v-model="errorDialog" width="30vw" height="60vh">
      <v-card>
        <v-card-title>
          <div class="text-h5">Error</div>
        </v-card-title>
        <v-card-text>
          <v-alert type="error" dismissible>
            <strong>{{ projectName }}</strong> is not copied
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            variant="tonal"
            @click="errorDialog = false"
            >{{ $t("close") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :model-value="overlay" class="align-center justify-center">
            <svg class="pl" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stop-color="hsl(193,90%,55%)" />
                              <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                            </linearGradient>
                          </defs>
                          <circle class="pl__ring" r="56" cx="64" cy="64" fill="none" stroke="hsla(0,10%,10%,0.1)" stroke-width="16" stroke-linecap="round" />
                          <path class="pl__worm" d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" fill="none" stroke="url(#pl-grad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="44 1111" stroke-dashoffset="10" />
            </svg>
    </v-overlay>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useStore } from "@/store/app";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const moveDialog = ref(false);
const copyDialog = ref(false);
const errorDialog = ref(false);
const projectName = ref("");
const loading = ref(false);
const selectedMoveStage = ref<number | null>(null);
const selectedNames = ref(store.selectedNames);
const triggerAnimation = ref(false);
const overlay = ref(false);

// This is important to make sure the computed property is updated when the store.selectedStageID changes
// It is also needed to ensure localizations are updated when the language changes
const items = computed(() => {
  const stages = [
    { text: t("sketch"), value: 1 },
    { text: t("sketch_review"), value: 2 },
    { text: t("approve_before_columns"), value: 3 },
    { text: t("awaiting_client_approval"), value: 4 },
    { text: t("execution_stage"), value: 5 },
    { text: t("autocad_review"), value: 6 },
    { text: t("ready_to_print"), value: 7 },
    { text: t("validate_sign_review_copy"), value: 8 },
    { text: t("ready_to_collect"), value: 9 },
    { text: t("client_received_copy"), value: 10 },
    { text: t("edit_client_notes"), value: 11 },
    { text: t("ready_for_final_receipt"), value: 12 },
    { text: t("awaiting_completion_of_plans"), value: 13 },
    { text: t("completed_projects"), value: 14 },
  ];

  // Remove current stage from the list of stages if it is not the move dialog
  if (moveDialog.value) {
    const currentStage = store.selectedStageID;
    return stages.filter((stage) => stage.value !== currentStage);
  }
  
  return stages;
});

watch(
  () => store.selectedStageID,
  (newVal) => {

    // Reset the selectredIDs when stage view is changed to hide the action buttons
    store.setSelectedIDs([]);
  }
);
watch(
  () => store.selectedIDs,
  (ids) => {
    if (ids.length > 0) {
      triggerAnimation.value = true;
    } else {
      triggerAnimation.value = false;
    }
  }
);

watch(
  () => store.selectedNames,
  (newNames) => {
    selectedNames.value = newNames;
  }
);

const moveToRules = [
  (value: string) => {
    if (value) return true;
    loading.value = false;
    return "Please select the stage.";
  },
];

const updateGrid = () => {
  fetch("https://aljarrash-backend.onrender.com/api/projects/")
    .then((result) => result.json())
    .then((remoteRowData) =>
      remoteRowData.filter((proj: any) => proj.stage == store.selectedStageID)
    )
    .then((filteredRowData) => store.setRowData(filteredRowData))
    .finally(() => overlay.value = false);
};

async function fetchData(type?: string) {
  if (type === "delete") {
    selectedMoveStage.value = 15; // move to inactive stage
  }
  if (selectedMoveStage.value) {
    loading.value = true;
    overlay.value = true;
    let formdata = new FormData();
    formdata.append("stage", String(selectedMoveStage.value));

    let requestOptions: any = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    const store = useStore();
    try {
      const results = await Promise.allSettled(
        store.selectedIDs.map((id) =>
          fetch(
            `https://aljarrash-backend.onrender.com/api/projects/${id}/`,
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error))
        )
      );

    } catch (error) {
      // Handle any errors that occurred during the fetch operations...
    } finally {
      updateGrid();
      loading.value = false;
      moveDialog.value = false;
      selectedMoveStage.value = null;
    }
  }
}

const moveTo = () => {
  fetchData();
};

const copyTo = async () => {
  if (selectedMoveStage.value) {
    loading.value = true;
    overlay.value = true;
    const copyData = [...store.selectedRows];
    copyData.map(project => project.stage = selectedMoveStage.value);

  // need to itrate to update raw data
  let myHeaders = new Headers();
  myHeaders.append("content-type", "application/json");

  let requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: '',
    redirect: "follow",
  }

    try {
      const results = await Promise.allSettled(
        copyData.map((project) => {

          requestOptions.body = JSON.stringify(project);
          fetch(
            `https://aljarrash-backend.onrender.com/api/projects/`,
            requestOptions
          )
          .then((response) => {
            if (!response.ok) {
              // Display a dialog to show project name is not copied
              projectName.value = project.project_name;
              errorDialog.value = true;
            }
            return response.text();
            })
          .then((result) => {
            console.log("Result is :", result)
          })
          .catch((error) => console.log("error", error))
        })
      );

    } catch (error) {
      // Handle any errors that occurred during the fetch operations...
      alert(error);
    } finally {
      updateGrid();
      loading.value = false;
      copyDialog.value = false;
      selectedMoveStage.value = null;
    }
  }

};
const deleteProj = () => {
  fetchData("delete");
};

</script>
