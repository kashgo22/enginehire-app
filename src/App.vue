<template>
  <ion-app>
    <ion-loading v-if="isLoading" :is-open="isLoading" message="Loading..." />
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {
    ...mapActions("auth", ["getCurrentUser", "getCurrentAgency"]),
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "userId", "userData"]),
    ...mapGetters("page", ["isLoading"]),
  },
  async created() {
    if (
      this.tryGet(() => this.isAuthenticated) &&
      this.tryGet(() => this.userId)
    ) {
      await this.getCurrentUser(this.userId);
      // await this.getCurrentAgency(this.userData.agencyId);
      // if (this.tryGet(() => this.agencyErrors.length)) {
      //   alert(this.agencyErrors);
      // }
      
    }
  },
});
</script>
