<template>
  <!-- Icons -->
  <ion-button v-bind="$attrs">
    <ion-icon :slot="iconPos" :name="iconName"></ion-icon>
    <slot></slot>
  </ion-button>
</template>

<script>
import { IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonButton },
  props: {
    iconPos: {
      type: String,
      default: "",
    },
    iconName: {
      type: String,
      default: "",
    },
  },
});
</script>
