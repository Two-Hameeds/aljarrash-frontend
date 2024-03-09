<template>
      <v-btn variant="text" class="left-align">
        <v-badge :content="messageCount" color="">
          <v-icon>mdi-chat-outline</v-icon>
        </v-badge>
      </v-btn>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const messageCount = ref(0);

</script>

<style>
.left-align {
  padding: 0;
  justify-content: left;
}
</style>