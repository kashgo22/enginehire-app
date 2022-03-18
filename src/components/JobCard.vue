<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ jobId }}</ion-card-title>
    </ion-card-header>
    <ion-card-content class="font-quicksand">
      <ion-card-subtitle class="text-base font-bold">
        Start Time:
        <ion-text class="font-medium">{{ jobStartDate }}</ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold">
        End Time:
        <ion-text class="font-medium">{{ jobEndDate }}</ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold">
        Special Notes:
        <ion-text class="font-medium">{{ jobNotes }}</ion-text>
      </ion-card-subtitle>
      <ion-card-subtitle class="text-base font-bold flex items-center gap-7">
        Current Status:
        <ion-badge class="font-light px-7" color="success">{{
          jobStatus
        }}</ion-badge>
      </ion-card-subtitle>
    </ion-card-content>
    <ion-grid>
      <ion-row class="flex items-center flex-justify-between">
        <ion-col class="w-full">
          <!-- <ion-col v-if="
              addTimeToDate(job.startDate).toDateString() ==
                new Date().toDateString() ||
              (dateInDjangoFormat(new Date()) >=
                dateInDjangoFormat(new Date(job.startDate)) &&
                $store.getters.agency.manual_clocking)
            "> -->
          <ion-button
            class="rounded-full w-full"
            v-if="job.status == 'Assigned' || !job.actualStartTime"
            @click="clockInModal(job.jobId)"
          >
            Clock In
          </ion-button>
          <!-- </ion-col> -->
          <ion-button
            class="rounded-full w-full"
            v-if="
              job.status == 'In Progress' ||
              (job.actualStartTime && !job.actualEndTime)
            "
            @click="clockOutModal(job.jobId)"
          >
            Clock Out
          </ion-button>
          <ion-button
            class="rounded-full w-full"
            v-if="
              !job.candidateReviewed &&
              dateInDjangoFormat(job.startDate) <= todayDjangoFormat
            "
            @click="showReviewDialog(job)"
          >
            Leave a Review
          </ion-button>
        </ion-col>
        <ion-col class="w-full">
          <ion-button class="rounded-full w-full">
            View Job Details
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-modal :is-open="showClockInModal">
      <eh-modal v-model="showClockInModal">
        <template #header>
          <ion-title>Ready to Start?</ion-title>
        </template>
        <template #body>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Family: <ion-text>{{ job.posterName }}</ion-text>
          </ion-text>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Date: <ion-text>{{ job.startDate }}</ion-text>
          </ion-text>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Time: <ion-text>{{ job.startTime }}</ion-text>
          </ion-text>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Status: <ion-text>{{ job.status }}</ion-text>
          </ion-text>
          <eh-textarea
            v-model="userNotes"
            class="text-primary text-lg pb-0"
            label="Any Notes?"
          >
          </eh-textarea>
        </template>
        <template #footer>
          <ion-button class="rounded-full w-full mt-40" @click="handleClockIn(currentJob)">
            Clock In
          </ion-button>
        </template>
      </eh-modal>
    </ion-modal>
    <ion-modal :is-open="showClockOutModal">
      <eh-modal v-model="showClockOutModal">
        <template #header>
          <ion-title>Done Working?</ion-title>
        </template>
        <template #body>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Family: <ion-text>{{ job.posterName }}</ion-text>
          </ion-text>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Date: <ion-text>{{ job.startDate }}</ion-text>
          </ion-text>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Time: <ion-text>{{ job.startTime }}</ion-text>
          </ion-text>
          <ion-text class="text-base font-bold flex items-center gap-7">
            Status: <ion-text>{{ job.status }}</ion-text>
          </ion-text>
          <eh-textarea
            v-model="userNotes"
            class="text-primary text-lg pb-0"
            label="Any Notes?"
          >
          </eh-textarea>
        </template>
        <template #footer>
          <ion-button class="rounded-full w-full mt-40" @click="handleClockOut(currentJob)">
            Clock Out
          </ion-button>
        </template>
      </eh-modal>
    </ion-modal>
  </ion-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { IonModal } from "@ionic/vue";
import EhModal from "./EhModal.vue";
import EhTextarea from "./UI/EhTextarea.vue";
import { mapActions } from "vuex";

export default defineComponent({
  components: { IonModal, EhModal, EhTextarea },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state) => (isOpenRef.value = state);
    const data = { content: "New Content" };
    return { isOpenRef, setOpen, data };
  },
  data() {
    return {
      currentJob: null,
      showClockInModal: false,
      showClockOutModal: false,
      userNotes: ''
    };
  },
  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    jobId() {
      return this.tryGet(() => this.job.jobId);
    },
    jobStartDate() {
      return this.tryGet(() => this.job.startDate);
    },
    jobEndDate() {
      return this.tryGet(() => this.job.endDate);
    },
    jobStatus() {
      return this.tryGet(() => this.job.status);
    },
    jobNotes() {
      return this.tryGet(() => this.job.notes);
    },
  },
  methods: {
    ...mapActions("jobs", ["updateJob"]),
    clockInModal(id) {
      this.showClockInModal = true;
      this.currentJob = id;
    },
    clockOutModal(id) {
      this.showClockOutModal = true;
      this.currentJob = id;
    },
    async handleClockIn(currentJob) {
      let now = new Date();
      let startHour = now.getHours();
      let startMinute = now.getMinutes();

      // if (this.$store.getters.agency.manual_clocking) {
      //   startHour = this.startHour;
      //   startMinute = this.startMinute;
      // }

      let startTime = null;
      // if (this.user.boolean_selector5) { // If they are manually clocking in
      // if (this.$store.getters.agency.manual_clocking) {
      //   // If they are manually clocking in
      //   // startTime = this.combineTime(this.startHour, this.startMinute, this.startAMPM)
      //   startTime = this.combineTime(startHour, startMinute, this.startAMPM);
      // } else {
      // startTime = now.getHours().toString() + ":" + now.getMinutes().toString() + ":00"
      startTime = startHour.toString() + ":" + startMinute.toString() + ":00";
      // }
      const UpdatedJobData = {
        actual_start_date: this.dateInDjangoFormat(new Date()),
        actual_start_time: startTime,
        status: "In Progress",
        text3: this.notes,
      };
      const jobInfo = {
        jobId: currentJob,
        jobInfo: UpdatedJobData,
      };
      await this.updateJob(jobInfo);
    },
    async handleClockOut(currentJob) {
      console.log('Curent Job Id ==>', currentJob)
      let now = new Date();

      // let startTime = this.job.actual_start_time.split(":")
      // let startTimes = [(parseInt(startTime[0])),(parseInt(startTime[1]))]
      // let hoursWorked = (((now.getHours()*60 + now.getMinutes()) - (startTimes[0]*60 + startTimes[1]))/60).toFixed(2)

      let startTime = this.breakDownTime(this.job.actual_start_time);

      // let regularHours = hoursWorked
      // let overtimeHours = 0
      // if (hoursWorked > 8.0) {
      //   regularHours = 8.0
      //   overtimeHours = hoursWorked - 8.0
      // }

      let endHour = now.getHours();
      let endMinute = now.getMinutes();

      // if (this.$store.getters.agency.manual_clocking) {
      //   endHour = this.endHour;
      //   endMinute = this.endMinute;
      // }

      let endTime = null;
      let hoursWorked = null;
      // if (this.user.boolean_selector5) { // If they are manually clocking in
      // if (this.$store.getters.agency.manual_clocking) {
      //   // If they are manually clocking in
      //   // endTime = this.combineTime(this.endHour, this.endMinute, this.endAMPM)
      //   endTime = this.combineTime(endHour, endMinute, this.endAMPM);
      //   // hoursWorked = ((((parseInt(this.endHour))*60 + parseInt(this.endMinute)) - (startTimes[0]*60 + startTimes[1]))/60).toFixed(2)
      // } else {
        // endTime = now.getHours().toString() + ":" + now.getMinutes().toString() + ":00"
        endTime = endHour.toString() + ":" + endMinute.toString() + ":00";
        // hoursWorked = (((now.getHours()*60 + now.getMinutes()) - (startTimes[0]*60 + startTimes[1]))/60).toFixed(2)
      // }

      let endTimeComponents = this.breakDownTime(endTime);

      // hoursWorked = ((((parseInt(endHour))*60 + parseInt(endMinute)) - (startTimes[0]*60 + startTimes[1]))/60).toFixed(2)
      hoursWorked = this.timeDeltaHours(
        startTime.hour,
        startTime.minutes,
        startTime.ampm,
        endTimeComponents.hour,
        endTimeComponents.minutes,
        endTimeComponents.ampm
      );
      // NEED TO INCORPORATE THE END DATE INTO THE HOUR CALCULATION (IN THE MASTER CALENDAR TOO WHEN APPROVING A JOB)
      // https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript

      // new Date("dateString") is browser-dependent and discouraged, so we'll write
      // a simple parse function for U.S. date format (which does no error checking)
      function parseDate(str) {
        console.log("str",str)
        var mdy = str.split("-");
        return new Date(mdy[0], mdy[1] - 1, mdy[2]);
      }

      function datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
      }

      // alert(datediff(parseDate("1/1/2000"), parseDate("1/1/2001")));
      // alert(datediff(parseDate(this.dateInDjangoFormat(this.job.date)), parseDate(this.todayDjangoFormat)));

      // Number of days between job start and end date
      // let daysDelta = datediff(
      //   parseDate(this.job.startDate),
      //   parseDate(this.todayDjangoFormat)
      // );

      // hoursWorked = hoursWorked + 24 * daysDelta; 
      // Add 24 hours to the hours worked for each day of difference between clock in and out

      // console.log(endTime);
      // console.log(hoursWorked);

      const UpdatedJobData = {
          actual_end_time: endTime,
          actual_end_date: this.dateInDjangoFormat(new Date()),
          status: "Completed",
          text4: this.notes,
      };
      const jobInfo = {
        jobId: currentJob,
        jobInfo: UpdatedJobData,
      };
      await this.updateJob(jobInfo);
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
        let hour = parseInt(time.split(':')[0])
        let ampm = 'AM'
        // We don't want to deal with 24 hour time, converting to ampm
        // This takes hours like 13, 14, ..., 23 and subtracts 12 to bring them to their ampm hour
        if (hour > 12) {
          hour = hour - 12
          ampm = 'PM'
        }
        else if (hour == 12) { // For 12pm, we don't want to subtract 12, but still need to set it as PM
          ampm = 'PM'
        }
        else if (hour == 0) { // hour 0 means 12am
          hour = 12
          ampm = 'AM'
        }
        // else {
        //   hour = startHourActual
        //   // this.startAMPMActual = 'AM'
        // }
        let minutes = time.split(':')[1]

        // console.log(time)
        // console.log(hour)
        // console.log(minutes)
        // console.log(ampm)

        return { 'hour': hour, 'minutes': minutes, 'ampm': ampm }
        // return [hour,  minutes, ampm]
      }
      else {
        return 0, '', ''
      }
    },
    timeDeltaHours(startHour, startMinute, startAMPM, endHour, endMinute, endAMPM) {
      //
      // Used for computing the difference in hours between 2 AMPM times, useful to prevent scheduling time blocks below a length threshold
      //
      let startTime = parseInt(startHour)
      if (startTime == 12) {
        startTime -= 12
      }
      // else {
      //   this.startHour -= 1
      // }
      if (startAMPM == 'PM') {
        // console.log(this.startHour)
        startTime += 12
        // console.log(this.startHour)
      }
      startTime += (parseInt(startMinute) / 60)

      let endTime = parseInt(endHour)
      if (endTime == 12) {
        endTime -= 12
      }
      // else {
      //   this.endHour -= 1
      // }
      if (endAMPM == 'PM') {
        endTime += 12
      }
      endTime += (parseInt(endMinute) / 60)

      return endTime - startTime
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
