<template>
  <ion-item>
    <ion-label :class="labelClasses" position="floating">{{ label }}</ion-label>
    <ion-textarea rows="3"
      v-bind="$attrs"
      :value="inputVal"
      @input="inputHandler"
    ></ion-textarea>
    <ion-note
      v-for="error in errors"
      :key="error.id"
      class="text-sm"
      color="danger"
      >{{ error }}</ion-note
    >
  </ion-item>
</template>

<script>
import { defineComponent } from "vue";
import { IonTextarea } from "@ionic/vue";

export default defineComponent({
  name: "EhTextarea",
  components: { IonTextarea },
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: String,
    Number,
    labelClass: {
      type: String,
      default: "",
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.inputValue = this.modelValue;
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.inputVal = val;
      },
    },
  },
  data: () => ({
    inputVal: "",
  }),
  computed: {
    labelClasses() {
      return this.labelClass + " text-light text-base uppercase";
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
});
</script>

<style scoped>
.text-base {
  line-height: 1.7rem;
}
</style>
