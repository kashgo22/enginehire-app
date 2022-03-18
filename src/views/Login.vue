<template>
  <ion-page class="content-bg-primary">
    <ion-loading v-if="isLoading" :is-open="isLoading" message="Loading..." />
    <ion-content :fullscreen="true">
      <ion-grid class="h-full p-30 flex items-center justify-center">
        <ion-row
          class="content-wrapper h-full w-full flex items-center justify-around"
        >
          <ion-col size="12" class="flex flex-col items-center">
            <ion-icon
              class="fs-140"
              color="light"
              name="person-circle-outline"
            />
            <ion-text
              class="section-heading text-center text-3xl"
              color="light"
            >
              Login
            </ion-text>
          </ion-col>
          <ion-col size="12" class="input-fields flex flex-col">
            <eh-input
              :errors="errors.email"
              v-model="form.email"
              class="text-light text-lg pb-0"
              type="text"
              label="Email"
            />
            <eh-input
              :errors="errors.password"
              v-model="form.password"
              class="text-light text-lg pb-0"
              type="password"
              label="Password"
            />
            <ion-button
              type="submit"
              color="light"
              class="text-primary text-lg shadow-lg rounded-full my-20"
              @click="handleSubmit"
            >
              Login
            </ion-button>
          </ion-col>
          <ion-text class="text-light uppercase justify-center gap-5">
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
import { addIcons } from "ionicons";
import { personCircleOutline } from "ionicons/icons";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "LoginPage",
  created() {
    addIcons({
      "person-circle-outline": personCircleOutline,
    });
  },
  data() {
    return {
      isLoading: false,
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
    ...mapActions("auth", ["login", "getCurrentUser"]),
    async handleSubmit() {
      this.errors.email = [];
      this.errors.password = [];
      const { email, password } = this.form;
      if (!email) {
        this.errors.email.push("Email is required.");
      }
      if (!password) {
        this.errors.password.push("Password is required.");
      }
      if (email && password) {
        const body = {
          agency: 70,
          username: email,
          password: password,
        };
        this.isLoading = true;
        await this.login(body);
        console.log(
          "tryGet",
          this.tryGet(() => this.userData.userId)
        );
        if (this.authErrors.length) {
          alert(this.authErrors);
        } else {
          await this.getCurrentUser(this.userData.userId);
          if (this.authErrors.length) {
            alert(this.authErrors);
          } else {
            this.$router.push("/home");
            this.isLoading = false;
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["authErrors", "userData"]),
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
.input-fields input {
  padding-bottom: 0px !important;
}
</style>
