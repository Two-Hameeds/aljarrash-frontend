<template>
  <div>
    <v-tooltip :text="$t('addAttachment')">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          style="margin: 5px"
          icon="mdi-paperclip-plus"
          @click="dialog = true"
          :class="{'fade-in-top': triggerAnimation, 'hidden': !triggerAnimation}"
        />
      </template>
    </v-tooltip>
    <v-dialog v-model="dialog" width="50vw" height="60vh">
      <v-form>
        <v-card>
          <v-form @submit.prevent="addAttachment">
            <v-card-title class="text-center ma-2">
              <span class="text-h5">{{ projectName }}</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-select
                    v-model="selectedFileType"
                    :rules="typeRule"
                    clearable
                    :label="$t('fileType')"
                    prepend-icon="mdi-file-settings-outline"
                    :items="[
                      {text: t('deed'), value: 'deed'},
                      {text: t('identity'), value: 'identity'},
                      {text: t('land_survey'), value: 'land_survey'},
                      {text: t('soil_test'), value: 'soil_test'},
                      {text: t('client_form'), value: 'client_form'},
                      {text: t('old_license'), value: 'old_license'},
                      {text: t('civil_defense'), value: 'civil_defense'},
                      {text: t('water_authority'), value: 'water_authority'},
                    ]"
                    item-title="text"
                    item-value="value"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-file-input
                    v-model="file"
                    :rules="fileRules"
                    :disabled="!selectedFileType"
                    accept="application/pdf"
                    :label="$t('fileInput')"
                    @change=""
                  >
                  </v-file-input>
                </v-col>
              </v-row>
  
              <v-textarea
                :label="$t('comment')"
                rows="5"
                prepend-icon="mdi-comment"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" @click="dialog = false">{{
                $t("close")
              }}</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                :loading="loading"
                type="submit"
                variant="tonal"
                >{{ $t("ok") }}</v-btn
              >
            </v-card-actions>
          </v-form>
          <v-progress-linear
              :indeterminate="loading"
              color="green"
            ></v-progress-linear>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store/app";

const store = useStore();
const { t } = useI18n();

let projectName = ref(store.selectedNames[0]);
const triggerAnimation = ref(false);

watch(
  () => store.selectedNames[0],
  (newName) => {
    projectName.value = newName;
  }
);

watch(
  () => store.selectedIDs,
  (ids) => {
    if (ids.length > 0 && ids.length < 2) {
      triggerAnimation.value = true;
    }
    else{
      triggerAnimation.value = false;
    }
  }
);

const dialog = ref(false);
const loading = ref(false);
const file = ref<File[] | undefined>(undefined);
const selectedFileType = ref(null);
const typeRule = [
  (value: string) => {
    if (value) return true;
    return t('chooseType');
  },
];
const fileRules = [
  (file: any) => {
    if (file.value && file.value[0]) {
      return true;
    }
    return t('chooseFile');
  },
        // other rules...
];

const addAttachment = () => {
  if (file.value && file.value[0]) {
    loading.value = true;
    const formdata = new FormData();
    formdata.append(selectedFileType.value!, file.value[0]);
    formdata.append("stage", String(store.selectedStageID));

    const requestOptions:any = {
        method: 'PUT',
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://aljarrash-backend.onrender.com/api/projects/${store.selectedIDs[0]}/?`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(() => {
        fetch("https://aljarrash-backend.onrender.com/api/projects/")
          .then((result) => result.json())
          .then((remoteRowData) =>
            remoteRowData.filter(
              (proj: any) =>
                proj.stage == store.selectedStageID
            )
          )
          .then((filteredRowData) => (store.setRowData(filteredRowData)))
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        loading.value = false;
        dialog.value = false;
        selectedFileType.value = null;
        file.value = undefined;
      });
  }

};
</script>
