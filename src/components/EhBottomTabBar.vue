<template>
  <ion-tab-bar color="primary" slot="bottom">
    <ion-tab-button
      v-for="item in items"
      :key="item.to"
      :tab="item.to"
      :selected-tab="isRoute(item.to)"
      @click="gotoPage(item.to)"
    >
      <ion-label class="mt-2">{{ item.title }}</ion-label>
      <ion-icon :src="getIcon(item.icon)" />
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script>
export default {
  name: "EhBottomTabBar",
  data: () => ({
    items: [
      {
        title: "Home",
        to: "/home",
        icon: "homeOutline",
      },
      {
        title: "My Jobs",
        to: "/my-jobs",
        icon: "briefcaseOutline",
      },
      {
        title: "Profile",
        to: "/profile",
        icon: "personCircleOutline",
      },
    ],
  }),
  methods: {
    isRoute(to) {
      return this.$route.path.includes(to);
    },
    gotoPage(to) {
      return this.$router.push(to);
    },
  },
};
</script>

<style scoped>
ion-tab-button[selected-tab="true"] {
  font-weight: bold;
  color: var(--ion-color-light);
}
/* ion-tab-bar {
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
} */
</style>
