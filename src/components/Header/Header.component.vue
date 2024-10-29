<template>
  <header class="header">
    <div class="header-content">
      <a href="/main">
        <img class="logo" src="../../assets/logo-healme.png" alt="Logo" />
      </a>
      <h1>{{ $t('header.welcome') }}</h1>

      <!-- Contenedor para el menú del perfil -->
      <div class="profile-menu-container">
        <img class="profile-pic" src="../../assets/profile-pic.png" alt="Profile" @click="toggleMenu" />

        <!-- Menú desplegable que aparece a la derecha de la imagen -->
        <div v-if="showMenu" class="dropdown-menu">
          <ul>
            <li @click="navigateTo('/main/doctor-view')">Doctor</li>
            <li @click="navigateTo('/main')">User</li>
          </ul>
        </div>
      </div>

      <LanguageSwitcher />
    </div>
  </header>
</template>

<script>
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.vue';

export default {
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    navigateTo(route) {
      this.$router.push(route);
      this.showMenu = false; // Ocultar el menú después de seleccionar la opción
    }
  },
  mounted() {
    // Detectar clic fuera del menú para cerrarlo
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    navigateTo(route) {
      this.$router.push(route);
      this.showMenu = false; // Ocultar el menú después de seleccionar la opción
    },
    handleClickOutside(event) {
      const profileMenuContainer = this.$el.querySelector('.profile-menu-container');
      if (profileMenuContainer && !profileMenuContainer.contains(event.target)) {
        this.showMenu = false;
      }
    }
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 150px;
}

.profile-menu-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 50%;
  left: 60px;
  transform: translateY(-50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 120px;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
  color: #333;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}


</style>
