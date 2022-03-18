<template>
  <eh-main-layout>
    <template #content>
      <ion-loading v-if="isLoading" :is-open="isLoading" message="Loading..." />
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-title
              class="text-3xl font-semibold font-quicksand mt-16 text-center"
              >My Jobs</ion-title
            >
          </ion-col>
          <ion-col v-if="errors.length" size="12">
            <p>Error Loading Jobs</p>
            <!-- // handle this properly -->
          </ion-col>
          <ion-col v-else size="12">
            <job-card
              class="job-card shadow-custom"
              v-for="job in jobsData"
              :key="job.id"
              :job="job"
            />
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

export default defineComponent({
  name: "MyJobsPage",
  components: {
    EhMainLayout,
    JobCard,
  },
  data: () => ({
    isLoading: false,
    errors: [],
  }),
  watch: {
    userData: {
      deep: true,
      immediate: true,
      async handler(val) {
        if (this.tryGet(() => val.userId) && this.tryGet(() => val.agencyId)) {
          this.isLoading = true;
          const userInfo = {
            userId: val.userId,
            agencyId: val.agencyId,
          };
          await this.getJobsList(userInfo);
          this.isLoading = false;
          if (this.jobsErrors.length) {
            this.errors = this.jobsErrors;
          }
        }
      },
    },
  },
  computed: {
    ...mapGetters("jobs", ["jobsData", "jobsErrors"]),
    ...mapGetters("auth", ["userData"]),
  },
  methods: {
    ...mapActions("jobs", ["getJobsList"]),
  },
});
</script>
