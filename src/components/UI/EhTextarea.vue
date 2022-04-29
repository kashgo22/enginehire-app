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
import { IonNote, IonLabel, IonItem, IonTextarea } from "@ionic/vue";
export default defineComponent({
  name: "EhTextarea",
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
  components: {
    IonNote, IonLabel, IonItem, IonTextarea
  },
});
</script>

<style scoped>
.text-base {
  line-height: 1.7rem;
}
</style>
