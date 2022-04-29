<template>
  <eh-main-layout :showBottomTabBar="false">
    <template #content>
      <ion-alert
      :is-open="isOpenRef"
      :header="alert.header"
      :sub-header="alert.subHeader"
      :message="alert.message"
      css-class="my-custom-class"
      :buttons="buttons"
      @didDismiss="logOut"
    >
    </ion-alert>
      <ion-grid class="">
        <ion-row>
          <ion-col>
            <ion-title
              class="text-3xl font-semibold font-quicksand mt-16 text-center">
              Workspace 
            </ion-title>
          </ion-col>
          <ion-col>
            <ion-title
              class="text-base font-semibold font-quicksand mt-16 text-center">
              Please select your Workspace
              </ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="flex flex-col gap-2">
            <eh-card v-for="agency in userAgencies" :key="agency.agency_id"
              class="workspace-card" @click="selectWorkspace(agency.agency_id)">
              <template #content>
                <ion-title color="light"
                  class="text-2xl font-semibold font-quicksand text-center">
                  {{ agency.agency_name }}
                </ion-title>
              </template>
            </eh-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </eh-main-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EhCard from "../components/UI/EhCard.vue";
import { mapActions, mapGetters } from "vuex";
import EhMainLayout from "../layouts/EhMainLayout.vue";
import { IonGrid, IonRow, IonCol, IonTitle, IonAlert } from '@ionic/vue';

export default defineComponent({
  name: 'SelectWorkspacePage',
  components: {
    EhCard, EhMainLayout, IonRow, IonGrid, IonCol, IonTitle, IonAlert
  },
  data: () => ({
    alert: {
      header: '',
      subHeader: '',
      message: ''
    }
  }),
  computed: {
    ...mapGetters("auth", ["userAgencies", "userLoginInfo", "userId", "userData"]),
  },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = state => isOpenRef.value = state;
    const buttons = ['Ok'];
    return { buttons, isOpenRef, setOpen }
  },
  methods: {
    ...mapActions("auth", ["generateToken", "getCurrentAgency","getCurrentUser"]),
    ...mapActions("page", ["startLoader", "stopLoader"]),
    logOut(){
      localStorage.removeItem("eh-token");
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    },
    async selectWorkspace(agencyId) {
      this.startLoader();
      await this.generateToken({
        ...this.userLoginInfo,
        agency: agencyId
      });
      await this.getCurrentAgency(agencyId)
      await this.getCurrentUser(this.userId)
      this.stopLoader();
      if(!this.userData.isCandidate){
        this.setOpen(true);
        this.alert.header = 'Invalid Login'
        this.alert.message = 'Currently, App only supports "Candidate" login.'
        this.alert.message = 'Please use a Candidate account to login.'
        return
      }
      this.$router.push("/home");
    },
  },
});
</script>

<style scoped>
.workspace-card .card-content-md {
  padding-bottom: 0px;
}

.workspace-card ion-card-header {
  padding: 0px !important;
}

.workspace-card {
  background: var(--ion-color-primary);
  padding: 0px;
  border-radius: 24px;
}

.workspace-card.selected-card {
  border: 2px solid var(--ion-color-primary) !important;
}
</style>
