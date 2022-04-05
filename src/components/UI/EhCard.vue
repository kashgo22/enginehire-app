<template>
  <ion-card class="shadow-custom">
    <ion-card-header v-if="hasHeaderSlot">
      <slot name="header"></slot>
    </ion-card-header>
    <ion-card-content v-if="hasContentSlot">
      <slot name="content"></slot>
    </ion-card-content>
    <ion-grid v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </ion-grid>
  </ion-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EhCard",
  computed: {
    hasFooterSlot() {
      return !!this.$slots.footer
    },
    hasContentSlot() {
      return !!this.$slots.content
    },
    hasHeaderSlot() {
      return !!this.$slots.header
    },
  },
});
</script>

<style scoped>
.job-card .card-content-md {
  padding-bottom: 0px;
}
.job-card {
  margin-bottom: 15px;
  border-radius: 24px;
}
</style>
