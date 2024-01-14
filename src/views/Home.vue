<template>
    <div>
        <div class="jumbotron">
            <Jumbotron></Jumbotron>
        </div>
        <div class="carousel">
            <Carousel></Carousel>
        </div>
    </div>
</template>

<script>
import Carousel from '../mineCompoents/Carousel.vue'
import Jumbotron from '@/components/Jumbotron.vue';

export default {
    components: {
        Carousel,
        Jumbotron,
    },

    data() {
        return {

        }
    }
}

</script>

<style scoped>
.jumbotron {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
}

.carousel {
    margin: 0;
}
</style>