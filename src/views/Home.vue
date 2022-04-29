<template>
  <eh-main-layout>
    <template #content>
      <ion-grid class="h-full flex flex-col items-center justify-between">
        <ion-row>
          <ion-col>
            <ion-title
              class="text-3xl font-semibold font-quicksand mt-16 text-center">
              Home
            </ion-title>
            <ion-title
              class="text-xl font-semibold font-quicksand mt-16 text-center">
                Welcome {{userData?.firstName}}
            </ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col
            class="flex flex-col items-center justify-center gap-10 mt-20">
            <ion-text
              class="block text-xl font-semibold font-quicksand mt-16 text-center">
              Please Navigate to "My Jobs" Tab to view your Jobs
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
        </ion-row>
      </ion-grid>
    </template>
  </eh-main-layout>
</template>

<script>
import { defineComponent } from "vue";
import EhMainLayout from "../layouts/EhMainLayout.vue";
import { IonGrid, IonRow, IonCol, IonTitle, IonText } from '@ionic/vue';
import {mapGetters} from 'vuex';

export default defineComponent({
  name: "HomePage",
  components: {
    EhMainLayout, IonGrid, IonRow, IonCol, IonTitle, IonText
  },
  computed: {
    ...mapGetters("auth", ["userData"]),
  }
});
</script>

<style scoped>
</style>
