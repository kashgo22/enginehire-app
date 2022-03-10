<template>
  <ion-page class="content-bg-primary">
    <ion-content :fullscreen="true">
      <ion-grid class="h-100 p-30 flex-align-center flex-justify-center">
        <ion-row
          class="content-wrapper h-100 w-100 flex-align-center flex-justify-around"
        >
          <ion-col size="12" class="flex-column flex-align-center">
            <ion-icon
              class="fs-140"
              color="light"
              name="person-circle-outline"
            />
            <ion-text
              class="section-heading text-align-center text-3xl"
              color="light"
            >
              Login
            </ion-text>
          </ion-col>
          <ion-col size="12" class="input-fields flex-column">
            <input-field
              :errors="errors.email"
              v-model="form.email"
              class="text-light text-lg"
              type="text"
              label="Email"
            />
            <input-field
              :errors="errors.password"
              v-model="form.password"
              class="text-light text-lg"
              type="password"
              label="Password"
            />
            <button
              type="submit"
              expand="expand"
              class="py-12 bg-light text-primary text-xl shadow-lg rounded-full my-20"
              > Login </button
            >
          </ion-col>
          <ion-text class="text-light uppercase flex-justify-center gap-5">
            Don't have an acccount?
            <ion-router-link href="#" class="underline">
              Sign up
            </ion-router-link>
          </ion-text>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import InputField from "@/components/InputField.vue";
import {
  IonPage,
  IonContent,
  IonText,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/vue";
import { addIcons } from "ionicons";
import { personCircleOutline } from "ionicons/icons";
import { mapActions } from "vuex";

export default defineComponent({
  name: "LoginPage",
  components: {
    IonContent,
    IonPage,
    IonText,
    IonIcon,
    InputField,
    IonGrid,
    IonCol,
    IonRow,
  },
  created() {
    addIcons({
      "person-circle-outline": personCircleOutline,
    });
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {
        email: [],
        password: [],
      },
    };
  },
  methods: {
    ...mapActions("auth", ["getCurrentUser"]),
    handleSubmit() {
      this.errors.email = [];
      this.errors.password = [];
      if (!this.form.email) {
        this.errors.email.push("Email is required.");
      }
      if (!this.form.email) {
        this.errors.password.push("Password is required.");
      }
      if (this.form.email && this.form.password) {
        // this.getCurrentUser();
      }
    },
  },
});
</script>

<style scoped>
ion-content {
  padding: 20px;
}
.section-heading {
  text-transform: uppercase;
  font-family: "Quicksand", sans-serif;
}
.content-wrapper {
  gap: 30px;
}
.content-wrapper > * {
  width: 100%;
}

ion-icon {
  color: blue;
}
.input-fields {
  gap: 10px;
}
.input-fields ion-item {
  --border-color: white; /* default underline color */
  --highlight-color-invalid: red; /* invalid underline color */
  --highlight-color-valid: green; /* valid underline color */
}
.input-fields ion-item.item-has-focus {
  --highlight-background: var(
    --ion-color-secondary
  ); /* focused underline color */
}
</style>
