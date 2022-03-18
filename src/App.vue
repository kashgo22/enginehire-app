<template>
  <ion-app>
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
    ...mapActions("auth", ["getCurrentUser"]),
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "userId"]),
  },
  async created() {
    if(this.tryGet(()=> this.isAuthenticated) && this.tryGet(()=> this.userId)){
       await this.getCurrentUser(this.userId);
    }
  },
});
</script>
