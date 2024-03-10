<template>
    <div>
        <div>
            <p class="title">
                江畔何人初见月，江月何年初照人
            </p>
            <div class="jumbotron-buttons-container">
                <button @click="toCommunication" class="community-button">文章</button>
            </div>

        </div>
    </div>
</template>



<style scoped>
.title {
    font-size: 50px;
    font: 900 50px '';
}

.jumbotron-buttons-container {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: center;
}

.jumbotron-buttons-container button {
    width: 25%;
    height: 100px;
    border: 50px solid balck;
    border-radius: 50px;
    padding: 5px;
    font-size: larger;
    font: 900 50px '';
    background-color: transparent;
    color: #000;
    box-shadow: 3px 3px 3px rgba(145, 145, 145, 0.8);
    cursor: pointer;
    animation: buttonAnimation 6s infinite;
}

@keyframes buttonAnimation {
    0% {
        width: 25%;
        background-color: rgba(255, 255, 255, 0.5);
    }

    10% {
        width: 40%;
        background-color: rgba(228, 228, 228, 0.5);
    }

    20% {
        width: 55%;
        color: white;
        background-color: rgba(185, 184, 184, 0.5);
    }

    30% {
        width: 70%;
        color: white;
        background-color: rgba(165, 165, 165, 0.5);
    }

    40% {
        width: 85%;
        color: white;
        background-color: rgba(128, 128, 128, 0.5);
    }

    50% {
        width: 70%;
        color: white;
        background-color: rgba(165, 165, 165, 0.5);
    }

    60% {
        width: 55%;
        color: white;
        background-color: rgba(185, 184, 184, 0.5);
    }

    70% {
        width: 40%;
        background-color: rgba(228, 228, 228, 0.5);
    }

    80% {
        width: 25%;
        background-color: rgba(255, 255, 255, 0.5);
    }
}
</style>

<script>

export default ({
    methods: {
        toCommunication() {
            this.$router.push("/community");
        }
    }
})

</script>