<template>
  <eh-card class="job-card">
    <template #header>
      <ion-card-title>{{ job.posterName }} -
        {{ addTimeToDate(job.date).toDateString() }}</ion-card-title>
    </template>
    <template #content>
      <ion-card-subtitle class="text-base font-bold font-quicksand">
        Booked Start:
        <ion-text class="font-medium">
          {{ djangotimeformatAMPM(job.startTime) }}
        </ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold font-quicksand">
        Booked End:
        <ion-text class="font-medium">
          {{ djangotimeformatAMPM(job.endTime) }}
        </ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold font-quicksand">
        Clocked Start:
        <ion-text class="font-medium">
          {{ djangotimeformatAMPM(job.actualStartTime) }}
        </ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold font-quicksand">
        Clocked End:
        <ion-text class="font-medium">
          {{ djangotimeformatAMPM(job.actualEndTime) }}
        </ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold font-quicksand">
        Regular:
        <ion-text class="font-medium">
          {{ calculateRegularHoursWorked(job) }}
        </ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold font-quicksand">
        Overtime:
        <ion-text class="font-medium">
          {{ calculateOvertimeHoursWorked(job) }}
        </ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle
        class="text-base font-bold flex items-center gap-7 font-quicksand">
        Current Status:
        <ion-badge class="font-primary px-7" color="success">
          {{ job.status }}
        </ion-badge>
      </ion-card-subtitle>
    </template>
    <template #footer>
      <ion-row class="flex items-center justify-between">
        <ion-col class="w-full">
          <ion-button @click="jobDetailsModal" class="rounded-full w-full">
            View Job Details
          </ion-button>
          <ion-button v-if="isClockIn(job)" class="rounded-full w-full"
            @click="clockInModal">
            Clock In
          </ion-button>
          <ion-button v-if="
            job.status == 'In Progress' ||
            (job.actualStartTime && !job.actualEndTime)
          " class="rounded-full w-full" @click="clockOutModal">
            Clock Out
          </ion-button>
          <ion-button v-if="
            job.candidateReviewed &&
            dateInDjangoFormat(job.date) <= todayDjangoFormat
          " class="rounded-full w-full" @click="reviewModal">
            Leave a Review
          </ion-button>
        </ion-col>
      </ion-row>
    </template>
  </eh-card>
  <ion-modal :is-open="showClockInModal">
    <eh-modal v-model="showClockInModal">
      <template #header>
        <ion-title v-if="agencyData?.manualClocking">When did you start?
        </ion-title>
        <ion-title v-else>Ready to Begin?</ion-title>
      </template>
      <template #body>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Family: <ion-text>{{ job.posterName }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Date: <ion-text>{{ job.date }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Time: <ion-text>{{ job.startTime }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Status: <ion-text>{{ job.status }}</ion-text>
        </ion-text>
        <eh-textarea v-model="comments" class="text-primary text-lg pb-0"
          label="Any Notes?">
        </eh-textarea>
      </template>
      <template #footer>
        <ion-button class="rounded-full w-full mt-40"
          @click="handleClockIn(job)">
          Clock In
        </ion-button>
      </template>
    </eh-modal>
  </ion-modal>
  <ion-modal :is-open="showClockOutModal">
    <eh-modal v-model="showClockOutModal">
      <template #header>
        <ion-title v-if="agencyData?.manualClocking">When did you end?
        </ion-title>
        <ion-title v-else>Finished?</ion-title>
      </template>
      <template #body>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Family: <ion-text>{{ job.posterName }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Date: <ion-text>{{ job.date }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Time: <ion-text>{{ job.startTime }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Status: <ion-text>{{ job.status }}</ion-text>
        </ion-text>
        <eh-textarea v-model="comments" class="text-primary text-lg pb-0"
          label="Any Notes?">
        </eh-textarea>
      </template>
      <template #footer>
        <ion-button class="rounded-full w-full mt-40"
          @click="handleClockOut(job)">
          Clock Out
        </ion-button>
      </template>
    </eh-modal>
  </ion-modal>
  <ion-modal :is-open="showReviewModal">
    <eh-modal v-model="showReviewModal">
      <template #header>
        <ion-title>Please Leave a Review</ion-title>
      </template>
      <template #body>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Family: <ion-text>{{ job.posterName }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Date: <ion-text>{{ job.date }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Time: <ion-text>{{ job.startTime }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Status: <ion-text>{{ job.status }}</ion-text>
        </ion-text>
        <ion-item>
          <ion-label>Rating</ion-label>
          <ion-select v-model="rating" value="Rating" interface="action-sheet">
            <ion-select-option value="1">1</ion-select-option>
            <ion-select-option value="2">2</ion-select-option>
            <ion-select-option value="3">3</ion-select-option>
            <ion-select-option value="4">4</ion-select-option>
            <ion-select-option value="5">5</ion-select-option>
          </ion-select>
        </ion-item>
        <eh-textarea v-model="comments" class="text-primary text-lg pb-0"
          label="Comments">
        </eh-textarea>
      </template>
      <template #footer>
        <ion-button class="rounded-full w-full mt-40"
          @click="handleSubmitReview(job)" :disabled="isDisabled">
          Submit
        </ion-button>
      </template>
    </eh-modal>
  </ion-modal>
  <ion-modal :is-open="showJobDetailsModal">
    <eh-modal v-model="showJobDetailsModal">
      <template #header>
        <ion-title>Thanks for filling this job!</ion-title>
      </template>
      <template #body>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Address: <ion-text class="font-normal">{{ job.address1 }}</ion-text>
        </ion-text>
        <ion-text v-if="job.city || job.provincestate || job.postal_code"
          class="text-base font-bold flex items-center gap-7">
          Location:
          <ion-text class="font-normal">
            <ion-text>{{ job.city }}</ion-text>
            <ion-text v-if="
              (job.city && job.provinceState) || (job.city && job.postalCode)
            ">, </ion-text>
            <ion-text>{{ job.provinceState }} </ion-text>
            <ion-text v-if="job.provinceState && job.postalCode">, </ion-text>
            <ion-text>{{ job.postalCode }}</ion-text>
          </ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Start Date:
          <ion-text class="font-normal">{{
            new Date(addCurrentTimeToDate(job.date)).toDateString()
          }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Start Time:
          <ion-text class="font-normal">{{
            djangotimeformatAMPM(job.startTime)
          }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          End Time:
          <ion-text class="font-normal">{{
            djangotimeformatAMPM(job.endTime)
          }}</ion-text>
        </ion-text>
        <ion-text class="text-base font-bold flex items-center gap-7">
          Hourly Rate:
          <ion-text class="font-normal">${{ job.candidateRate }}</ion-text>
        </ion-text>
      </template>
      <template #footer>
        <ion-button class="rounded-full w-full mt-40">
          View Client Profile
        </ion-button>
      </template>
    </eh-modal>
  </ion-modal>
</template>

<script>
import { defineComponent } from "vue";
import EhModal from "./EhModal.vue";
import EhTextarea from "./UI/EhTextarea.vue";
import EhCard from "./UI/EhCard.vue";
import { mapActions, mapGetters } from "vuex";
import { IonCardTitle, IonCardSubtitle, IonText, IonRow, IonCol, IonButton, IonModal, IonSelect, IonSelectOption, IonTitle, IonBadge, IonLabel, IonItem } from '@ionic/vue'

export default defineComponent({
  components: {
    IonModal, EhModal, EhTextarea, IonSelect, IonSelectOption, EhCard, IonCardTitle, IonCardSubtitle, IonText, IonRow, IonCol, IonButton, IonTitle, IonBadge, IonLabel, IonItem
  },
  data: () => ({
    showClockInModal: false,
    showClockOutModal: false,
    showReviewModal: false,
    showJobDetailsModal: false,
    comments: "",
    rating: null,
    review: "",
    isDisabled: true,
  }),
  props: {
    job: {
      type: Object,
      default: () => { },
    },
  },
  watch: {
    rating: {
      immediate: true,
      handler(val) {
        if (val !== null) {
          this.isDisabled = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters("job", ["jobsData", "jobsErrors", "jobReviewsErrors"]),
    ...mapGetters("auth", ["agencyData", "agencyErrors"]),
  },
  methods: {
    ...mapActions("job", ["getJobsList", "updateJob", "addReview"]),
    isClockIn(job) {
      if ((this.addTimeToDate(job.date).toDateString() == new Date().toDateString() ||
        (this.dateInDjangoFormat(new Date()) >= this.dateInDjangoFormat(new Date(job.date)) &&
          this.agencyData?.manualClockin)) && (job.status == 'Assigned' || !job.actualStartTime)) {
        return true;
      }
      return false
    },
    clockInModal() {
      this.showClockInModal = true;
    },
    clockOutModal() {
      this.showClockOutModal = true;
    },
    jobDetailsModal() {
      this.showJobDetailsModal = true;
    },
    reviewModal() {
      this.showReviewModal = true;
    },
    showReviewDialog() {
      this.isShowInputDialog = true;
    },
    async handleClockIn(currentJob) {
      let now = new Date();
      let startHour = now.getHours();
      let startMinute = now.getMinutes();
      let startTime = null;
      startTime = startHour.toString() + ":" + startMinute.toString() + ":00";
      const model = {
        jobId: currentJob.jobId,
        body: {
          actual_start_date: this.dateInDjangoFormat(new Date()),
          actual_start_time: startTime,
          status: "In Progress",
          text3: this.comments,
        },
      };
      this.startLoader();
      await this.updateJob(model);
      if (this.jobsErrors?.length) {
        alert(this.jobsErrors);
      } else {
        const body = {
          agencyId: currentJob.agencyId,
          userId: currentJob.fillerId,
        };
        await this.getJobsList(body);
        if (this.jobsErrors?.length) {
          alert(this.jobsErrors);
        } else {
          this.stopLoader();
          this.comments = "";
          this.showClockInModal = false;
        }
      }
    },
    async handleClockOut(currentJob) {
      let now = new Date();
      let endHour = now.getHours();
      let endMinute = now.getMinutes();
      let endTime = null;
      endTime = endHour.toString() + ":" + endMinute.toString() + ":00";
      const model = {
        jobId: currentJob.jobId,
        body: {
          actual_end_time: endTime,
          actual_end_date: this.dateInDjangoFormat(new Date()),
          status: "Completed",
          text4: this.comments,
        },
      };
      this.startLoader();
      await this.updateJob(model);
      if (this.jobsErrors?.length) {
        alert(this.jobsErrors);
      } else {
        const body = {
          agencyId: currentJob.agencyId,
          userId: currentJob.fillerId,
        };
        await this.getJobsList(body);
        if (this.jobsErrors?.length) {
          alert(this.jobsErrors);
        } else {
          this.stopLoader();
          this.comments = "";
          this.showClockOutModal = false;
        }
      }
    },
    async handleSubmitReview(currentJob) {
      if (this.rating === null) {
        this.isDisabled = true;
        return;
      }
      this.startLoader();
      const body = {
        recipient: this.job.posterId,
        reviewer: this.job.fillerId,
        job: this.job.jobId,
        approved_review: true,
        rating: this.rating,
        review: this.comments,
      };
      this.stopLoader();
      await this.addReview(body);
      if (this.jobReviewsErrors?.length) {
        alert(this.jobReviewsErrors);
      } else {
        const model = {
          jobId: currentJob.jobId,
          body: {
            candidate_reviewed: true,
          },
        };
        await this.updateJob(model);
        if (this.jobsErrors?.length) {
          alert(this.jobsErrors);
        } else {
          const body = {
            agencyId: currentJob.agencyId,
            userId: currentJob.fillerId,
          };
          await this.getJobsList(body);
          if (this.jobsErrors?.length) {
            alert(this.jobsErrors);
          } else {
            this.stopLoader();
            this.comments = "";
            this.showReviewModal = false;
          }
        }
      }
    },
    dateInDjangoFormat(date) {
      if (date == null) {
        return null;
      }
      if (typeof date === "string") {
        if (date.includes("T")) {
          return date.split("T")[0];
        }
        return date;
      }
      // Want to convert date in the YYYY-MM-DD format for Django storage
      return (
        date.getFullYear().toString() +
        "-" +
        ("0" + (date.getMonth() + 1).toString()).slice(-2) +
        "-" +
        ("0" + date.getDate().toString()).slice(-2)
      );
    },
    combineTime(hour, minutes, ampm) {
      //
      // Used to combine the pieces of a time into an HH:MM:SS time
      //
      let HH = parseInt(hour);

      // This is to turn 12AM (midnight) into OO (don't have to worry about 12pm, because that will get fixed in the next step)
      if (HH == 12) {
        HH -= 12;
      }
      if (ampm == "PM") {
        HH += 12;
      }
      HH = ("0" + HH.toString()).slice(-2); // If the hour is a single digit, this pads it with a 0

      return `${HH}:${minutes}:00`;
    },
    breakDownTime(time) {
      //
      // This is to take a HH:MM:SS time and return it's hour, minute and AMPM so it can be edited
      //
      if (time) {
        let hour = parseInt(time.split(":")[0]);
        let ampm = "AM";
        // We don't want to deal with 24 hour time, converting to ampm
        // This takes hours like 13, 14, ..., 23 and subtracts 12 to bring them to their ampm hour
        if (hour > 12) {
          hour = hour - 12;
          ampm = "PM";
        } else if (hour == 12) {
          // For 12pm, we don't want to subtract 12, but still need to set it as PM
          ampm = "PM";
        } else if (hour == 0) {
          // hour 0 means 12am
          hour = 12;
          ampm = "AM";
        }
        // else {
        //   hour = startHourActual
        //   // this.startAMPMActual = 'AM'
        // }
        let minutes = time.split(":")[1];
        return { hour: hour, minutes: minutes, ampm: ampm };
        // return [hour,  minutes, ampm]
      } else {
        return 0, "", "";
      }
    },
    timeDeltaHours(
      startHour,
      startMinute,
      startAMPM,
      endHour,
      endMinute,
      endAMPM
    ) {
      //
      // Used for computing the difference in hours between 2 AMPM times, useful to prevent scheduling time blocks below a length threshold
      //
      let startTime = parseInt(startHour);
      if (startTime == 12) {
        startTime -= 12;
      }
      // else {
      //   this.startHour -= 1
      // }
      if (startAMPM == "PM") {
        startTime += 12;
      }
      startTime += parseInt(startMinute) / 60;

      let endTime = parseInt(endHour);
      if (endTime == 12) {
        endTime -= 12;
      }
      // else {
      //   this.endHour -= 1
      // }
      if (endAMPM == "PM") {
        endTime += 12;
      }
      endTime += parseInt(endMinute) / 60;

      return endTime - startTime;
    },
    todayDjangoFormat() {
      // Want to get today's date in the YYYY-MM-DD format for comparison with django dates
      let today = new Date();
      return (
        today.getFullYear().toString() +
        "-" +
        ("0" + (today.getMonth() + 1).toString()).slice(-2) +
        "-" +
        ("0" + today.getDate().toString()).slice(-2)
      );
    },
    addTimeToDate(date) {
      if (!date) {
        return null;
      }
      if (typeof date === "object") {
        return date;
      }
      if (date.includes("T")) {
        return new Date(date);
      }
      return new Date(date + "T00:00:00");
    },
    addCurrentTimeToDate(date) {
      let today = new Date();
      let hourNow = today.getHours();
      // https://stackoverflow.com/questions/18889548/javascript-change-gethours-to-2-digit
      // Need to make sure each of these values is 2 digits, otherwise it breaks the human date generation below
      hourNow = ("0" + hourNow).slice(-2);
      let minuteNow = today.getMinutes();
      minuteNow = ("0" + minuteNow).slice(-2);
      let secondNow = today.getMinutes();
      secondNow = ("0" + secondNow).slice(-2);

      return new Date(
        date
          .concat("T")
          .concat(hourNow)
          .concat(":")
          .concat(minuteNow)
          .concat(":")
          .concat(secondNow)
      );
    },
    djangotimeformatAMPM(djangotime) {
      // Take a django 24 hour time and return it in AMPM format
      if (djangotime) {
        var hours = djangotime.split(":")[0];
        var minutes = djangotime.split(":")[1];
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes; // minutes are already padded in django time
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
      } else {
        return strTime;
      }
    },
    calculateHoursWorked(job) {
      if (job.actualStartTime && job.actualEndTime) {
        return this.calculateDuration(
          job.actualStartDate,
          job.actualStartTime,
          job.actualEndDate,
          job.actualEndTime
        ).toFixed(2);
      }
      return null;
    },
    calculateRegularHoursWorked(job) {
      const hoursWorked = this.calculateHoursWorked(job);
      if (!hoursWorked) {
        return null;
      }
      return hoursWorked > 8 ? 8 : hoursWorked;
    },
    calculateOvertimeHoursWorked(job) {
      const hoursWorked = this.calculateHoursWorked(job);
      if (!hoursWorked) {
        return null;
      }
      return hoursWorked > 8 ? hoursWorked - 8 : 0;
    },
    calculateDuration(startDate, startTime, endDate, endTime) {
      if (!startDate) {
        startDate = this.dateInDjangoFormat(new Date());
      }
      if (!endDate) {
        endDate = startDate;
      }
      startDate = this.dateInDjangoFormat(startDate);
      endDate = this.dateInDjangoFormat(endDate);
      const startTimestamp = new Date(startDate + "T" + startTime).getTime();
      const endTimestamp = new Date(endDate + "T" + endTime).getTime();
      let diff = (endTimestamp - startTimestamp) / 3600000; // Diff in hour
      if (diff < 0) {
        // In this case, endDate is the day after startDate
        diff = diff + 24;
      }
      return diff;
    },
  },
});
</script>

<style scoped>
.job-card .card-content-md {
  padding-bottom: 0px;
}

.job-card {
  margin-bottom: 15px;
  border-radius: 24px;
}
</style>
