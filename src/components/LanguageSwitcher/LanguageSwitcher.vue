<template>
  <div class="language-switcher">
    <Button
        :label="currentLanguage"
        icon="pi pi-globe"
        class="p-button-rounded p-button-outlined p-button-primary"
        @click="toggleDropdown"
    />
    <div v-if="showDropdown" class="dropdown">
      <Button
          v-for="lang in languages"
          :key="lang.value"
          @click="changeLanguage(lang.value)"
          :label="lang.label"
          class="p-button-text language-option"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      currentLanguage: 'EN', // Por defecto, el idioma actual es inglés
      languages: [
        { label: 'EN', value: 'en' },
        { label: 'ES', value: 'es' }
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.currentLanguage = lang.toUpperCase(); // Actualizamos el texto del botón con el idioma seleccionado
      this.showDropdown = false; // Cerrar el menú una vez seleccionado el idioma
    }
  }
}
</script>

<style scoped>

</style>
