<template>
  <eh-main-layout>
    <template #content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-title
              class="text-3xl font-semibold font-quicksand mt-16 text-center">My
              Jobs</ion-title>
          </ion-col>
          <ion-col v-if="errors.length" size="12">
            <p>Error Loading Jobs</p>
          </ion-col>
          <ion-col v-else size="12">
            <job-card v-for="job in jobsData" :key="job.id" :job="job" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </eh-main-layout>
</template>

<script>
import { defineComponent } from "vue";
import JobCard from "../components/JobCard.vue";
import { mapGetters, mapActions } from "vuex";
import EhMainLayout from "../layouts/EhMainLayout.vue";
import { IonGrid, IonRow, IonCol, IonTitle } from '@ionic/vue'

export default defineComponent({
  name: "MyJobsPage",
  components: {
    EhMainLayout, JobCard, IonGrid, IonRow, IonCol, IonTitle
  },
  data: () => ({
    errors: [],
  }),
  watch: {
    userData: {
      deep: true,
      immediate: true,
      async handler(val) {
        if (val?.userId && val?.agencyId) {
          const userInfo = {
            userId: val.userId,
            agencyId: val.agencyId,
          };
          await this.getJobsList(userInfo);
          if (this.jobsErrors.length) {
            this.errors = this.jobsErrors;
          }
          this.stopLoader();
        }
      },
    },
  },
  created() {
    this.startLoader();
  },
  computed: {
    ...mapGetters("job", ["jobsData", "jobsErrors"]),
    ...mapGetters("auth", ["userData"]),
  },
  methods: {
    ...mapActions("job", ["getJobsList"]),
    ...mapActions("page", ["startLoader", "stopLoader"]),
  },
});
</script>
