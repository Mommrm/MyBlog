<template>
  <div>
    <div class="main-page">
      <div class="main-page-navbar">
        <Navbar></Navbar>
      </div>
      <div class="main-page-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import router from '@/router';

export default {
  components: {
    Navbar,
    router
  }
}
</script>


<style scoped>
.main-page-content {
  margin-top: 3vh;
  min-width: 90%;
}
</style>