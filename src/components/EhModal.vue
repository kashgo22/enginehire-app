<template>
  <ion-header class="flex items-center justify-between py-5">
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
            Cancel
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EhModal",
  props: {
    title: { type: String, default: "" },
    modelValue: { type: String },
  },
  created() {
    this.modalIsOpen = this.modelValue;
  },
  data() {
    return {
      modalIsOpen: false,
      startDate: new Date().toLocaleDateString(),
      startTime: new Date().toLocaleTimeString(),
      notes: "",
    };
  },
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
});
</script>
