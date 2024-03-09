<template>
  <v-app>
    <v-spacer></v-spacer>
    <h1 class="mx-auto pa-10">Login</h1>
    <v-card class="mx-auto" elevation="8" rounded="lg" width="40vw">
      <v-form @submit.prevent="">
        <v-card-title class="text-center">
          <h2 style="text-align: center" class="pa-5">
            {{ $t("toolbar_title") }}
          </h2>
        </v-card-title>
        <v-card-text style="direction: ltr">
          <div class="text-subtitle-1 text-medium-emphasis">Account</div>

          <v-text-field
            v-model = "username"
            clearable
            density="compact"
            placeholder="Enter your username"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Password

            <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?</a
            >
          </div>

          <v-text-field
          v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            clearable
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :loading="loading"
            type="submit"
            block
            size="large"
            color="green"
            variant="tonal"
            class="mb-8"
            @click="signIn"
            >{{ $t("ok") }}
          </v-btn>
        </v-card-actions>
      </v-form>
      <v-progress-linear
        :indeterminate="loading"
        color="green"
      ></v-progress-linear>
    </v-card>
    <div class="text-center ma-2">
        <v-snackbar
        v-model="snackbar"
        >
        {{ snackbarText }}

        <template v-slot:actions>
            <v-btn
                color="red"
                variant="text"
                @click="snackbar = false"
                >
                X
            </v-btn>
        </template>
        </v-snackbar>
    </div>
    <v-spacer></v-spacer>
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Footer from "@/components/Footer.vue";
import { useRouter } from "vue-router";
// import { useStore } from 'vuex';

const visible = ref(false);
const loading = ref(false);
const username = ref("");
const password = ref("");
const snackbar = ref(false);
const snackbarText = ref("");

const router = useRouter();

const signIn = () => {
  loading.value = true;
  setTimeout(() => {
    if (username.value === "admin2" && password.value === "admin2") {
        // need to use  Vuex store or Vue 3's provide/inject API to store the snack and add it in App.vue
        // store.commit('setSnackbar', { show: true, text: 'Welcome to the system' });
      router.push({path: "/home2"})
    } else {
        snackbarText.value = "Invalid username or password";
        snackbar.value = true;
    }
    loading.value = false;
  }, 2000);
};

</script>

<style>
.v-application {
  background: url("https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
