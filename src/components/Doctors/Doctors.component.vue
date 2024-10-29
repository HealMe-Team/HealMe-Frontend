<template>
  <div class="doctors-container">
    <div class="doctor" v-for="doctor in doctors" :key="doctor.id">
      <img :src="getImagePath(doctor.image)" alt="Doctor Image" class="doctor-image" />
      <h3 class="doctor-name">{{ doctor.name }}</h3>
      <p class="doctor-description">{{ doctor.description }}</p>
      <div class="rating">
        <i v-for="star in 5" :key="star" class="pi" :class="star <= doctor.rating ? 'pi-star-fill' : 'pi-star'"></i>
      </div>
    </div>
  </div>
</template>

<script>
import enDoctors from '../../locales/en.doctors.json';
import esDoctors from '../../locales/es.doctors.json';
import { watch } from 'vue';

export default {
  data() {
    return {
      doctors: [],
    };
  },
  created() {
    this.loadDoctors();
  },
  methods: {
    loadDoctors() {
      const currentLocale = this.$i18n.locale;
      this.doctors = currentLocale === 'en' ? enDoctors : esDoctors;
    },
    getImagePath(imageName) {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.loadDoctors();
    }
  }
}
</script>

<style scoped>
.doctors-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 40px 20px;
}

.doctor {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  width: 250px;
  padding: 20px;
  transition: transform 0.3s ease;
}

.doctor:hover {
  transform: scale(1.05);
}

.doctor-image {
  width: 100%;
  height: auto;
  border-radius: 20%;
  margin-bottom: 120px;
  object-fit: cover;
}

.doctor-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.doctor-description {
  font-size: 1em;
  color: #777;
  margin-bottom: 30px;
}

.rating {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pi-star, .pi-star-fill {
  font-size: 1.5em;
  color: gold;
}
</style>
