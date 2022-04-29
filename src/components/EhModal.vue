<template>
  <ion-header class="flex items-center justify-between py-16 bg-primary text-light">
    <slot name="header"> </slot>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <slot name="body"></slot>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <slot name="footer"></slot>
          <ion-button @click="handleCancel" class="rounded-full w-full">
            Close
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import { IonHeader, IonRow, IonCol, IonGrid, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "EhModal",
  props: {
    title: { type: String, default: "" },
    modelValue: { type: Boolean },
  },
  created() {
    this.modalIsOpen = this.modelValue;
  },
  data: () => ({
    modalIsOpen: false,
  }),
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.inputVal = val;
      },
    },
  },
  methods: {
    handleCancel() {
      this.modalIsOpen = false;
      this.$emit("update:modelValue", this.modalIsOpen);
    },
  },
  components: {
    IonHeader, IonRow, IonCol, IonGrid, IonButton
  },
});
</script>
