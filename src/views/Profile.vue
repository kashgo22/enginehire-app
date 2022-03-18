<template>
  <eh-main-layout>
    <template #content>
      <ion-grid class="h-full flex flex-col items-center justify-between">
        <ion-row>
           <ion-col>
            <ion-title  class="text-3xl font-semibold font-quicksand mt-16 text-center">Profile</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="h-full flex justify-end">
            <ion-button @click="logOut" color="primary">Logout</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </eh-main-layout>
</template>

<script>
import { defineComponent } from "vue";
import EhMainLayout from "../layouts/EhMainLayout.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    EhMainLayout,
  },
  methods: {
    logOut() {
      localStorage.removeItem("eh-token");
      setTimeout(()=>{
        this.$router.push('/login');
      }, 500)
    }
  },
});
</script>

<style scoped></style>
