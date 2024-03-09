<template>
  <div>
    <v-btn
      v-if="complete"
      @click="dialog = true"
      variant="text"
      class="left-align"
    >
      <v-icon color="success">mdi-check</v-icon>
    </v-btn>
    <v-btn
      v-else-if="!complete"
      @click="dialog = true"
      variant="text"
      class="left-align"
    >
      <v-icon color="error">mdi-alert-decagram</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="30vw" height="60vh">
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">{{ projectName }}</span>
        </v-card-title>
        <v-card-text style="direction: rtl">
          <h3>{{ $t("requiredFiles") }}</h3>
          <ul>
            <li v-for="value in missing_attachments" class="red" prepend-icon="mdi-cursor-pointer">
              {{ $t(value[0]) }}
            </li>
          </ul>
          <br />
          <h3>{{ $t("uploadedFiles") }}</h3>
          <ul>
            <li v-for="value in uploaded_attachments" class="green">
                <a :href="attachments_status[value[0]]" target="_blank">{{ $t(value[0]) }}</a>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="dialog = false">{{
            $t("close")
          }}</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
// import { useI18n } from "vue-i18n";

// const { t, locale } = useI18n();
const dialog = ref(false);

// Define your props
const props = defineProps({
  params: Object,
});

let projectName = props.params!.data["project_name"];

const attachments_status = reactive<any>({
  deed: props.params!.data["deed"],
  identity: props.params!.data["identity"],
  land_survey: props.params!.data["land_survey"],
  soil_test: props.params!.data["soil_test"],
  client_form: props.params!.data["client_form"],
  old_license: props.params!.data["old_license"],
  civil_defense: props.params!.data["civil_defense"],
  water_authority: props.params!.data["water_authority"],
});

const uploaded_attachments = computed(() => {
  return Object.entries(attachments_status).filter(
    ([, value]) => value != null
  );
});

const missing_attachments = computed(() => {
    return Object.entries(attachments_status).filter(
    ([, value]) => value === null
  );
});

const complete = computed(() => {
  if (missing_attachments.value.length === 0) {
    return true;
  }
  return false;
});
</script>

<style>
.left-align {
  padding: 0;
  justify-content: left;
}

.green {
  color: #11c920;
  list-style: none;
}

.red {
  color: #ee0b0b;
  list-style: none;
}
</style>
