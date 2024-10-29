<template>
  <div class="hospitals-container">
    <div class="hospital" v-for="hospital in hospitals" :key="hospital.id">
      <img :src="getImagePath(hospital.image)" alt="Hospital Image" class="hospital-image" />
      <h3 class="hospital-name">{{ hospital.name }}</h3>
      <p class="hospital-description">{{ hospital.description }}</p>
      <p class="hospital-location">{{ hospital.location }}</p>
      <div class="rating">
        <i v-for="star in 5" :key="star" class="pi" :class="star <= hospital.rating ? 'pi-star-fill' : 'pi-star'"></i>
      </div>
    </div>
  </div>
</template>

<script>
import enHospitals from '../../locales/en.hospitals.json';
import esHospitals from '../../locales/es.hospitals.json';
import { watch } from 'vue';

export default {
  data() {
    return {
      hospitals: [],
    };
  },
  created() {
    this.loadHospitals();
  },
  methods: {
    loadHospitals() {
      const currentLocale = this.$i18n.locale;
      this.hospitals = currentLocale === 'en' ? enHospitals : esHospitals;
    },
    getImagePath(imageName) {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.loadHospitals();
    }
  }
}

</script>

<style scoped>
.hospitals-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 60px;
  padding: 80px 20px;
}

.hospital {
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  width: 250px;
  padding: 80px;
  transition: transform 0.3s ease;
}

.hospital:hover {
  transform: scale(1.05);
}

.hospital-image {
  width: 100%;
  height: auto;
  border-radius: 20%;
  margin-bottom: 50px;
  object-fit: cover;
}

.hospital-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.hospital-description {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 15px;
}

.hospital-location {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 60px;
}

.rating {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.pi-star, .pi-star-fill {
  font-size: 1.5em;
  color: gold;
}
</style>
