<template>
  <eh-main-layout>
    <template #content>
      <ion-grid class="h-full flex flex-col items-center justify-between">
        <ion-row>
          <ion-col>
            <ion-title
              class="text-3xl font-semibold font-quicksand mt-16 text-center"
              >Profile</ion-title
            >
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="flex flex-col items-center justify-center gap-10 mt-20">
            <ion-img class="profile-pic" :src="profilePic" alt="" />
            <ion-title class="font-bold text-2xl font-quicksand">{{ userName }}</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="h-full flex w-full items-center justify-center">
            <ion-button @click="logOut" color="primary">Logout</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </eh-main-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import EhMainLayout from "../layouts/EhMainLayout.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    EhMainLayout,
  },
  computed: {
    ...mapGetters("auth", ["userData"]),
    profilePic() {
      return this.tryGet(() => this.userData.profilePic);
    },
    userName() {
      return (
        `${this.tryGet(() => this.userData.firstName)} ${this.tryGet(() => this.userData.lastName)}`
      );
    },
    userEmail() {
      return this.tryGet(() => this.userData.email);
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem("eh-token");
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    },
  },
});
</script>

<style scoped>
ion-img.profile-pic::part(image) {
  border-radius: 100%;
  width: 200px;
  height: 200px;
  object-fit: none;
  border: 4px solid var(--ion-color-secondary);
}
</style>
