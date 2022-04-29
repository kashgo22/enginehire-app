<template>
  <ion-page class="content-bg-primary">
    <ion-loading v-if="isLoading" :is-open="isLoading" message="Loading..." />
    <ion-content :fullscreen="true">
      <ion-grid class="h-full px-30 flex items-center justify-center">
        <ion-row class="h-full w-full justify-between">
          <ion-col size="12">
            <ion-img class="profile-pic" :src="logo" alt="" />
          </ion-col>
          <ion-col size="12" class="flex flex-col items-center">
            <ion-icon class="fs-100" color="light"
              name="person-circle-outline" />
            <ion-text class="section-heading text-center text-3xl"
              color="light">
              Login
            </ion-text>
          </ion-col>
          <ion-col size="12" class="input-fields flex flex-col mt-22">
            <eh-input v-model="form.email" class="text-light text-lg pb-0"
              type="text" label="Email" />
            <eh-input v-model="form.password" class="text-light text-lg pb-0"
              type="password" label="Password" />
            <ion-button type="submit" color="light"
              class="text-primary text-lg shadow-lg rounded-full my-20"
              @click="handleSubmit">
              Login
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { addIcons } from "ionicons";
import { personCircleOutline } from "ionicons/icons";
import { mapActions, mapGetters } from "vuex";
import EhLogo from "../../public/assets/images/enginehire-logo.png";
import { IonLoading, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonText, IonButton } from '@ionic/vue'
import EhInput from "../components/UI/EhInput.vue";

export default defineComponent({
  name: "LoginPage",
  created() {
    addIcons({
      "person-circle-outline": personCircleOutline,
    });
  },
  data: () => ({
    form: {
      email: "",
      password: "",
    },
    logo: EhLogo,
  }),
  methods: {
    ...mapActions("auth", ["login", "getCurrentUser", "getCurrentAgency", "setUser"]),
    ...mapActions("page", ["startLoader", "stopLoader"]),
    async handleSubmit() {
      const { email, password } = this.form;
      if (email && password) {
        const body = {
          email,
          username: email,
          password: password,
        };
        this.startLoader();
        await this.login(body);
        this.setUser(body);
        this.stopLoader();
        if (this.authErrors.length) {
          // console.log(this.authErrors);
          return;
        }
        this.$router.push("/select-workspace");
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["authErrors", "userData", "agencyErrors"]),
    ...mapGetters("page", ["isLoading"]),
  },
  components: {
    IonLoading, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonText, IonButton, EhInput
  }
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
  gap: 20px;
}

.content-wrapper>* {
  width: 100%;
}

ion-icon {
  color: blue;
}

.input-fields {
  gap: 10px;
}

.input-fields ion-item {
  --border-color: white;
  /* default underline color */
  --highlight-color-invalid: red;
  /* invalid underline color */
  --highlight-color-valid: green;
  /* valid underline color */
}

.input-fields ion-item.item-has-focus {
  --highlight-background: var(--ion-color-secondary);
  /* focused underline color */
}

.input-fields input {
  padding-bottom: 0px !important;
}

.profile-pic {
  height: 150px;
  width: auto;
}
</style>
