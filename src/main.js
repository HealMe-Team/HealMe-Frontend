import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import PrimeVue from 'primevue/config';
import router from './router';
import SelectButton from 'primevue/selectbutton';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import 'primevue/resources/themes/vela-green/theme.css'; // Material Design theme
import 'primevue/resources/primevue.min.css'; // CSS Core de PrimeVue
import 'primeflex/primeflex.css';            // PrimeFlex para utilidades de diseño
import 'primeicons/primeicons.css';          // PrimeIcons para íconos
import './assets/main.css';                  // Etilos personalizados

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.component('SelectButton', SelectButton);
app.component('Dialog', Dialog);
app.component('Button', Button);
app.mount('#app');

