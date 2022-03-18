<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <slot name="content"></slot>
    </ion-content>
    <eh-bottom-tab-bar />
  </ion-page>
</template>

<script>
import EhBottomTabBar from "../components/EhBottomTabBar.vue";
export default {
  components: {
    EhBottomTabBar,
  },
};
</script>

<style lang="scss" scoped></style>
