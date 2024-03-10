<template>
    <div class="body">
        <div class="container">
            <div class="search-container">
                <input class="search-input" type="text" :placeholder="placeholderText" v-model="searchText">
                <button class="search-button" type="button" text="搜索" @click="search">搜索</button>
            </div>
            <div class="content-container">
                <div class="search-content-container">
                    <div class="search-content" v-for="article in articles" :key="article.articleId"
                        @click="toArticle(article.articleId)">
                        <div class="article-base-info" style="display: flex; justify-content:space-between;">
                            <div class="article-name">
                                {{ article.articleName }}
                            </div>
                            <div class="article-info">
                                <div class="article-author">{{ article.articleAuthor }}</div>
                                <div class="article-date">{{ article.articleDate }}</div>
                            </div>
                        </div>
                        <div class="article-abstract">
                            {{ article.articleAbstract }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
const { searchArticle } = require("../axios/articlesRequest");
import { useArticleStore } from "@/stores/article";
import { storeToRefs } from "pinia";

export default ({
    setup() {
        const articleStore = useArticleStore();
        const { articles } = storeToRefs(articleStore);
        const { setArticles } = articleStore;


        return {
            articles,
            setArticles
        }
    },
    created() {
        // 共用的获取articles清空 不然会出现未搜索就渲染数据
        this.setArticles([]);
    },
    data() {
        return {
            searchText: "",
            placeholderText: "请输入搜索关键词"
        }
    },

    methods: {
        search() {
            if (this.searchText != "") {
                searchArticle(this.searchText).then((res) => {
                    this.setArticles(res.data);
                }).catch((error) => {
                    console.log(error);
                })
            }
            else {
                this.placeholderText = "搜索词不能为空!";
            }
        },
        toArticle(articleId) {
            this.$router.push({
                path: '/articles/' + articleId,
            })
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

.container {
    width: 100%;
    display: block;
    justify-content: center;
    align-items: center;
}

.content-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-content-container {
    width: 95%;
    margin-top: 10px;
    display: block;
    justify-content: center;
    align-items: center;
}

.search-content {
    width: 100%;
    cursor: pointer;
    border: 1px solid grey;
    padding: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.search-content:hover {
    background-color: rgba(240, 240, 240, 0.3);
}

.search-container {
    width: 100%;
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