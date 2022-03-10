import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';
// import { ValidationProvider, extend } from 'vee-validate';
import {
  IonicVue,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonAlert,
  IonRippleEffect,
  IonImg,
  IonHeader,
  IonCheckbox,
  IonText,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonBadge,} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/app.scss';
import './theme/_font.scss';
const globalComponents = {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonAlert,
  IonRippleEffect,
  IonImg,
  IonHeader,
  IonCheckbox,
  IonText,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonBadge,
}
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);
Object.entries(globalComponents).forEach(([name, component]) => {
  app.component(name, component)
})  

router.isReady().then(() => {
  app.mount('#app');
});