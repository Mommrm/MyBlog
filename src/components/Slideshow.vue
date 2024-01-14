<template>
    <div class="slideshow">
      <img :src="images[currentIndex]" alt="Slideshow Image" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          require('@/resources/images/a.jpg'),
          require('@/resources/images/b.jpg'),
          require('@/resources/images/c.jpg'),
        ],
        currentIndex: 0,
      };
    },
    mounted() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000); // 每隔3秒切换一张图片
    },
  };
  </script>


<style scoped>
.slideshow {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slideshow img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

</style>