<template>
    <div>
        <div class="article-info-container">
            <div class="article-info-articleName">
                {{ article.articleName }}
            </div>
            <div class="article-item-container">
                <div class="aritcle-info-author" @click="toAuthorSpace">
                    {{ article.articleAuthor }}
                </div>
                <div class="aritcle-info-date">
                    {{ article.articleDate }}
                </div>
            </div>
        </div>
        <div class="article-content-container">
            <div class="content">
                {{ article.articleContent }}
            </div>
        </div>
    </div>
</template>

<script>
const { getAtContentById } = require("../axios/articlesRequest")
const { getUserIdByName } = require("../axios/userRequest")

export default ({
    data() {
        return {
            article: {
                articleId: "",
                articleName: "",
                articleContent: "",
                articleAuthor: "",
                articleAbstract: "",
                articleDate: "",
            }
        }
    },

    created() {
        this.article.articleId = this.$route.params.articleId;
        this.getArticleContentById(this.article.articleId);
    },

    methods: {
        //根据文章id获取文章详情
        getArticleContentById(articleId) {
            //用axios获取文章数据
            getAtContentById(articleId).then((res) => {
                this.article = res.data;
            }).catch((error) => {
                console.log(error);
            })
        },
        toAuthorSpace(pathName) {
            //获取作者userId方便进入用户空间
            getUserIdByName(this.article.articleAuthor).then((res) => {
                console.log(res);
                let userId = res.data;
                this.$router.push({
                    path: "/userspace/" + userId,
                });
            }).catch((error) => {
                console.log(error);
            })
        }
    }
})

</script>


<style scoped>
.article-info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0% 5%;
}

.article-info-articleName {
    font-weight: bolder;
    font-size: xx-large;
}

.article-content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0% 5%;
}

.content {
    display: block;
    width: 100%;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    overflow-x: hidden;
}

.aritcle-info-author {
    cursor: pointer;
}
</style>