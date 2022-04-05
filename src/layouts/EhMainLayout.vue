<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <slot name="content"></slot>
    </ion-content>
    <eh-bottom-tab-bar v-if="showBottomTabBar" />
  </ion-page>
</template>

<script>
import EhBottomTabBar from "../components/EhBottomTabBar.vue";
export default {
  components: {
    EhBottomTabBar,
  },
  props: {
    showBottomTabBar: {
      type: Boolean,
      default: true
    },
  },
};
</script>

<style lang="scss" scoped></style>
