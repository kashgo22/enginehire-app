<template>
  <eh-main-layout :showBottomTabBar="false">
    <template #content>
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
              Please select your Workspace</ion-title>
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
import { defineComponent } from "vue";
import EhCard from "../components/UI/EhCard.vue";
import { mapGetters } from "vuex";
import EhMainLayout from "../layouts/EhMainLayout.vue";
import { IonGrid, IonRow, IonCol, IonTitle } from '@ionic/vue'

export default defineComponent({
  name: 'SelectWorkspacePage',
  components: {
    EhCard, EhMainLayout, IonRow, IonGrid, IonCol, IonTitle,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters("auth", ["userAgencies"]),
  },
  methods: {
    selectWorkspace(agencyId) {
      console.log('agencyId', agencyId);
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
