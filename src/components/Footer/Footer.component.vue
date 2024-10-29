<template>
  <footer class="footer">
    <p>{{ $t('footer.copyright') }}</p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  z-index: 10;
}
</style>
