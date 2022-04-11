<template>
  <eh-main-layout>
    <template #content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-title
              class="text-3xl font-semibold font-quicksand mt-16 text-center">
              Home</ion-title>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </eh-main-layout>
</template>

<script>
import { defineComponent } from "vue";
import EhMainLayout from "../layouts/EhMainLayout.vue";
import { IonGrid, IonRow, IonCol, IonTitle } from '@ionic/vue'

export default defineComponent({
  name: "HomePage",
  components: {
    EhMainLayout, IonGrid, IonRow, IonCol, IonTitle
  },
});
</script>

<style scoped>
</style>
