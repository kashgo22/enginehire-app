<template>
  <ion-header class="pl-4">
    <ion-toolbar class="bg-light" :color="color">
      <ion-buttons slot="end">
        <ion-button color="light"> Sign up </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button>
          <ion-icon
            slot="icon-only"
            ios="ellipsis-horizontal"
            md="ellipsis-vertical"
          ></ion-icon>
        </ion-button>
      </ion-buttons>
      <div v-if="showLogo" class="flex-align-center">
        <ion-img class="app-logo" :src="logo"></ion-img>
        <ion-title class="p-0 text-secondary -ml-7 text-lg font-medium font-quicksand">ngineHire</ion-title>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/vue";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "AppHeader",
  components: {
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
  },
  props: {
    showLogo: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
  },
  setup() {
    const logo = computed(() =>
      require('../../public/assets/images/enginehire-logo.png')
    )
    return {
      logo,
    }
  },
});
</script>
<style scoped>
.app-logo {
  height: 45px;
  width: 45px;
}
.ion-toolbar {
  box-shadow: 0 1px 10px 4 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(100 20 0 / 0.7);
}
</style>
