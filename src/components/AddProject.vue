<template>
  <div>
    <v-btn @click="dialog = true" class="ma-2" icon="mdi-plus-thick" size="x-large">
    </v-btn>
    <v-dialog v-model="dialog" width="30vw" height="60vh">
      <v-card>
        <v-form @submit.prevent="addProject">
          <v-card-title class="text-center">
            <span class="text-h5">New Project</span>
          </v-card-title>
          <v-card-text style="direction: rtl">
            <v-text-field v-model="projectName" clearable :rules="nameRule" :label="$t('project_name')"
              prepend-icon="mdi-office-building-plus-outline"></v-text-field>
            <v-select v-model="projectType" clearable :rules="typeRule" :label="$t('project_type')"
              prepend-icon="mdi-application-cog-outline" :items="[
                { text: t('new'), value: 'new' },
                { text: t('addition'), value: 'addition' },
                { text: t('restoration'), value: 'restoration' },
                { text: t('destruction'), value: 'destruction' },
              ]" item-title="text" item-value="value"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue" variant="tonal" @click="dialog = false">{{
              $t("close")
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" type="submit" color="green" variant="tonal" class="mt-2">{{ $t("ok") }}</v-btn>
          </v-card-actions>
        </v-form>
        <v-progress-linear
              :indeterminate="loading"
              color="green"
            ></v-progress-linear>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store/app";

const { t } = useI18n();
const store = useStore();
const dialog = ref(false);
const loading = ref(false);
const projectName = ref("");
const projectType = ref("");
const API_URL = import.meta.env.VITE_API_URL;

const nameRule = [
  (value: string) => {
    if (value) return true;
    return t('chooseName');
  },
];
const typeRule = [
  (value: string) => {
    if (value) return true;
    return t('chooseType');
  },
];

const addProject = () => {
  if (projectName.value && projectType.value) {
    loading.value = true;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      stage: store.selectedStageID,
      project_name: projectName.value,
    });
  
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${API_URL}/projects/`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => {
        fetch(`${API_URL}/projects/`)
          .then((result) => result.json())
          .then((remoteRowData) =>
            remoteRowData.filter(
              (proj: any) =>
                proj.stage == store.selectedStageID
            )
          )
          .then((filteredRowData) => (store.setRowData(filteredRowData)))
      })
      .catch((error) => console.log("Error", error))
      .finally(() => {
        loading.value = false;
        dialog.value = false;
        projectName.value = "";
        projectType.value = "";
      });
  }
};
</script>

<style>
.left-align {
  padding: 0;
  justify-content: left;
}
</style>
