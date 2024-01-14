<template>
    <div>
        <div class="article-card-container" v-for="article in articles" :key="article.articleId"
            @click="toArticle(article.articleId)">
            <div class="article-topic">
                <h3>{{ article.articleName }}</h3>
            </div>
            <div class="article-info">
                <div class="article-author">
                    <div class="font-info">{{ article.articleAuthor }}</div>
                </div>
                <div class="article-date">
                    <div class="font-info">{{ article.articleDate }}</div>
                </div>
            </div>
            <div class="article-abstract">
                <p class="font-p">{{ article.articleAbstract }}</p>
            </div>
        </div>
    </div>
</template>

<script>
const { getArticles } = require('../axios/articlesRequest')

export default ({
    data() {
        return {
            articles: []
        }
    },
    mounted() {
        // 开始默认查询第一页数据
        getArticles(0).then((res) => {
            this.articles = res.data;
        }).catch((error) => {
            console.log(error);
        });
    },
    methods: {
        toArticle(articleId) {
            this.$router.push({
                path: '/articles/' + articleId,
            })
        }
    }

})

</script>

<style scoped>
.article-card-container {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    border: 1px solid rgb(226, 226, 226);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.article-card-container:hover {
    background-color: rgb(247, 247, 247);
}

.article-info {
    display: flex;
    justify-content: space-between;
}

.font-info {
    color: black;
    margin-right: 1rem;
}

.font-p {
    color: grey;
}


@media all and (max-width: 300px) {
    .article-info {
        display: block;
    }
}
</style>