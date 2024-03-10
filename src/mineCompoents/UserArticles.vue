<template>
    <div>
        <div class="user-articles-contianer" v-if="articleExist">
            <div class="user-article-content" v-for="article in articles" :key="article.articleId"
                @click="toArticle(article.articleId)">
                <div class="article-info-container" style="display: flex; justify-content: space-between;">
                    <div class="article-name">
                        {{ article.articleName }}
                    </div>
                    <div class="article-info" style="font-size: smaller; color: grey;">
                        <div class=" article-author">{{ article.articleAuthor }}</div>
                        <div class="article-date">{{ article.articleDate }}</div>
                        <div class="article-delete-container" @click.stop="articleDelete(article.articleId)">
                            <div class="article-delete-button">删除</div>
                        </div>
                    </div>
                </div>
                <div class="article-abstract-container">
                    <div class="article-abstract" style="font-size: small; color: grey;">{{ article.articleAbstract }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const { getUserArticles, deleteArticle } = require('../axios/articlesRequest');
import { useIndexStore } from '@/stores';
import { useArticleStore } from '@/stores/article';
import { storeToRefs } from 'pinia';

export default ({
    props: {
        authorId: 0,
    },
    setup() {
        const userStore = useIndexStore();
        const articleStore = useArticleStore();
        const { userInfo } = storeToRefs(userStore);
        const { articles } = storeToRefs(articleStore);
        const { setArticles } = articleStore;

        return {
            userInfo,
            articles,
            setArticles,
        }
    },
    //获取用户的文章
    mounted() {
        getUserArticles(this.authorId).then((res) => {
            if (res.data.length != 0) {
                this.articleExist = true;
                this.setArticles(res.data);
            }
            else {
                this.articleExist = false;
            }
        }).catch((error) => {
            console.log(error);
        })
    },
    data() {
        return {
            articleExist: false,
            isIntoDelete: false,
        }
    },
    methods: {
        toArticle(articleId) {
            if (!this.isIntoDelete) {
                this.$router.push({
                    path: '/articles/' + articleId,
                })
            }
        },
        articleDelete(deleteId) {
            this.isIntoDelete = true;
            deleteArticle(deleteId).then((res) => {
                //删除成功后解除删除状态锁 并发回文章请求 重新加载删除后的文章序列
                getUserArticles(this.authorId).then((res) => {
                    if (res.data.length != 0) {
                        this.articleExist = true;
                        this.setArticles(res.data);
                    }
                    else {
                        this.articleExist = false;
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            })
            this.isIntoDelete = false;
        }
    },
})

</script>

<style scoped>
.user-article-content {
    cursor: pointer;
    padding: 10px;
    border: 1px solid grey;
    box-shadow: 3px 3px 3px rgba(114, 114, 114, 0.5);
}

.user-article-content:hover {
    background-color: rgba(240, 240, 240, 0.5);
}

.article-delete-button {
    position: relative;
    width: fit-content;
    font-size: larger;
    font-weight: 900;
    color: rgb(44, 44, 252);
}

.article-delete-button::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: black;
    transform: scaleX(0);
    transition: transform 0.3s;
}

.article-delete-button:hover::after {
    transform: scaleX(1);
}
</style>