<template>
  <div class="container">
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
            v-model="username"
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
            @click="login"
            >{{ $t("login") }}
          </v-btn>
        </v-card-actions>
      </v-form>
      <v-progress-linear
        :indeterminate="loading"
        color="green"
      ></v-progress-linear>
    </v-card>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ snackbarText }}

        <template v-slot:actions>
          <v-btn color="red" variant="text" @click="snackbar = false">
            X
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Footer from "@/components/Footer.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/app";

// import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();

// onMounted(() => {
//   let visits = sessionStorage.getItem('loginVisits');
//   if (visits) {
//     if (Number(visits) === 1) {
//       console.log('This is the second visit to this page');
//     }
//     sessionStorage.setItem('loginVisits', String(visits + 1));
//   } else {
//     sessionStorage.setItem('loginVisits', '1');
//   }

//   console.log(store.loggedIn);
//   if (store.loggedIn) {
//     router.push({ path: "/" });
//   }
// });

const visible = ref(false);
const loading = ref(false);
const username = ref("");
const password = ref("");
const snackbar = ref(false);
const snackbarText = ref("");

const login = () => {
  loading.value = true;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    username: username.value,
    password: password.value,
  });

  let requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://aljarrash-backend.onrender.com/api/auth/", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result:any) => {
      if(result.non_field_errors){
        snackbarText.value = "Invalid username or password";
        snackbar.value = true;
      }
      else if(result.token){
        store.setLoggedIn(true);
        store.setToken(result.token);
        router.push({ path: "/" });
      }
    })
    .catch((error) => {
      console.log("error", error)
    })
    .finally(() => {
      loading.value = false;
    });

  // setTimeout(() => {
  //   if (username.value === "admin2" && password.value === "admin2") {
  //     // need to use  Vuex store or Vue 3's provide/inject API to store the snack and add it in App.vue
  //     // store.commit('setSnackbar', { show: true, text: 'Welcome to the system' });
  //     store.setLoggedIn(true);
  //     store.setToken("ffee83e1d8d8c325152ed108bed0266cda6ee9e9");
  //     router.push({ path: "/" });
  //   } else {
  //     snackbarText.value = "Invalid username or password";
  //     snackbar.value = true;
  //   }
  //   loading.value = false;
  // }, 2000);
};
</script>

<style>
.container {
  flex: 1;
  background: url("https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
