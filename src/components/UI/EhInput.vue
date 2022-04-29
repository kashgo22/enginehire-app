<template>
  <ion-item>
    <ion-label :class="labelClasses" position="floating">{{ label }}</ion-label>
    <ion-input v-bind="$attrs" :value="inputVal" @input="inputHandler">
    </ion-input>
    <ion-note v-for="error in errors" :key="error.id" class="text-sm"
      color="danger">{{ error }}</ion-note>
  </ion-item>
</template>

<script>
import { IonLabel, IonInput, IonItem, IonNote } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputField",
  components: { IonLabel, IonInput, IonItem, IonNote },
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: String, Number,
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
    inputVal: ''
  }),
  computed: {
    labelClasses() {
      return this.labelClass + ' text-light text-base uppercase';
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
