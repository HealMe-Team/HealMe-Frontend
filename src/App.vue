<template>

  <div id="app">
    <Header v-if="showMainLayout" />
    <Toolbar  v-if="showMainLayout"/>
    <router-view />
    <Footer v-if="showMainLayout"/>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Header from './components/Header/Header.component.vue';
import Toolbar from './components/Toolbar/Toolbar.component.vue';
import Footer from './components/Footer/Footer.component.vue';
import RegisterDoctor from "@/components/RegisterDoctor/Register.Doctor.component.vue";
import RegisterUsuario from "@/components/RegisterUsuario/Register.Usuario.component.vue";
import LoginUsuario from "@/components/LoginUsuario/Login.Usuario.component.vue";
import LoginDoctor from "@/components/LoginDoctor/Login.Doctor.component.vue";
import {computed} from "vue";

export default {
  components: {
    LoginDoctor,
    LoginUsuario,
    RegisterUsuario,
    RegisterDoctor,
    Header,
    Toolbar,
    Footer
  },
  setup() {
    const route = useRoute();

    const showMainLayout = computed(() =>  route.path.startsWith('/main'));

    return { showMainLayout };
  }
}
</script>
