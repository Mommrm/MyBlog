<template>
    <div>
        <div>
            <p>
                江畔何人初见月，江月何年初照人
            </p>
            <div class="jumbotron-buttons-container">
                <button @click="toLand">登录</button>
                <button @click="toCommunication">社区</button>
            </div>

        </div>
    </div>
</template>



<style scoped>
.jumbotron-buttons-container {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: space-between;
}

.jumbotron-buttons-container button {
    padding: 5px 10px;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid black;
    color: #000;
    cursor: pointer;
}
</style>

<script>

export default ({
    methods: {
        toLand() {
            this.$router.push("/landpage");
        },
        toCommunication() {
            this.$router.push("/community");
        }
    }
})

</script>