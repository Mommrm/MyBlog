<template>
    <div class="body">
        <div class="search-container">
            <input class="search-input" type="text" placeholder="搜索文章" v-model="searchInput">
            <button class="search-button" type="button" text="搜索" @click="search">搜索</button>
        </div>
    </div>
</template>

<script>

export default ({

    data() {
        return {
            searchInput: "",
        }
    },

    methods: {
        search() {
            console.log(this.searchInput);
        }
    }
})

</script>

<style scoped>
.body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-container {
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

}

.search-input {
    width: 90%;
    padding: 1vh;
    border: 1px solid grey;
    border-radius: 15px;
}

.search-button {
    width: 5%;
    display: flex;
    padding: 1vh;
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    flex-shrink: 1;
    flex-grow: 0;
    border: 1px solid grey;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

.search-button:hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.search-button:active {
    box-shadow: 1px 1px 5px transparent;
}

@media all and (max-width: 750px) {
    .search-input {
        width: 85%;
        border: 0;
        border-radius: 0;
        outline: none;
        border-bottom: 1px solid grey;
    }

    .search-button {
        border: 0;
        background-color: transparent;
        box-shadow: none;
    }

    .search-button:hover,
    :active {
        box-shadow: none;
    }


}
</style>