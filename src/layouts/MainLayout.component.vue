<template>
  <div class="main-image">
    <img src="../assets/main-image.png" alt="Doctor" class="background-image" />
    <div v-if="isHomePage" class="overlay">
      <h1>Your health is my priority</h1>
    </div>
    <router-view class="content" />
  </div>
</template>

<script>
export default {
  name: 'MainImage',
  computed: {
    isHomePage() {
      return this.$route.path === '/main';
    }
  }
};
</script>

<style scoped>
.main-image {
  position: relative;
  width: 100%;
  height: 100vh;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.overlay {
  position: relative;
  z-index: 2;
  color: #000000;
}

.content {
  position: relative;
  z-index: 3;
  padding: 20px;
  color: #333;
  height: 100%;
  overflow: auto;
}
</style>
