<template>
    <div class="container">
        <div class="aside-content">
            <div class="aside-button">
                <button class="exit-button" type="button" @click="toPath(path[0].index)">回到社区</button>
            </div>
            <div class="aside-other-function">
                <div class="function-container">
                    <div class="function-label">
                        点赞:
                    </div>
                </div>
                <div class="function-container">
                    <div class="function-label">
                        收藏:
                    </div>
                </div>
                <div class="function-container">
                    <div class="function-label">
                        评论:
                    </div>
                </div>
            </div>
        </div>
        <div class="main-content-container" style="display: block; width: 100%;">
            <div class="main-content">
                <div class="article-info-container">
                    <div class="article-info-articleName">
                        {{ article.articleName }}
                    </div>
                    <div class="article-item-container">
                        <div class="aritcle-info-author" @click="toAuthorSpace">
                            {{ article.articleAuthor }}
                        </div>
                        <div class="aritcle-info-date" style="color: grey;">
                            {{ article.articleDate }}
                        </div>
                    </div>
                </div>
                <div class="article-content-container">
                    <div class="content" v-html="article.articleContent"></div>
                </div>
                <div class="article-other-container">
                    <div class="label-container" style="display: flex;">
                        <div class="label-text" style="color: grey;">标签: </div>
                        <div class="label-content">{{ article.articleTag }}</div>
                    </div>
                </div>
            </div>
            <div class="article-comment-container">
                <div class="comment-area-topic">
                    评论区
                </div>
                <div class="article-input-comment" style="display: flex;">
                    <div class="article-input-area">
                        <textarea class="article-textarea" placeholder="输入评论内容" v-model="commentInput"
                            @input="updateCharCount"></textarea>
                    </div>
                    <div class="comment-other">
                        <div class="button-sent" @click="sentComment(commentInput)">
                            发送
                        </div>
                        <div class="article-comment-charnum">{{ charCount }}/200</div>
                    </div>
                </div>
                <div class="article-comment" v-for="comment in comments" :key="comment.commentId">
                    <div class="article-comment-main-container" style="display: flex; width: 92%;">
                        <div class="article-comment-commentator">{{ comment.commentCommentator }}：</div>
                        <div class="article-comment-content">{{ comment.commentContent }}</div>
                    </div>
                    <div class="article-comment-like" @click="likeComment(comment.commentId)">点赞：{{ comment.commentLike }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
const { getAtContentById } = require("../axios/articlesRequest")
const { getUserIdByName } = require("../axios/userRequest")
const { postComment } = require("../axios/commentRequest");
const { getCommentsByArticleId } = require("../axios/commentRequest")
const { likeComment } = require("../axios/commentRequest")
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";

export default ({
    setup() {
        const userStore = useIndexStore();
        const { userInfo } = storeToRefs(userStore);

        return {
            userInfo,
        }
    },
    data() {
        return {
            article: {
                articleId: "",
                articleName: "",
                articleContent: "",
                articleAuthor: "",
                articleAbstract: "",
                articleDate: "",
                articleTag: "",
            },
            path: [
                {
                    index: 0,
                    pathName: "community",
                }
            ],
            comments: [],
            commentInput: "",
            charCount: 0,
        }
    },

    created() {
        this.article.articleId = this.$route.params.articleId;
        this.getArticleContentById(this.article.articleId);
    },
    mounted() {
        getCommentsByArticleId(this.article.articleId).then((res) => {
            this.comments = res.data;
        }).catch((error) => {
            console.log(error);
        })
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
                let userId = res.data;
                this.$router.push({
                    path: "/userspace/" + userId,
                });
            }).catch((error) => {
                console.log(error);
            })
        },
        toPath(index) {
            this.$router.push("/" + this.path[index].pathName);
        },
        sentComment(commentContent) {
            let comment = {
                articleId: this.article.articleId,
                commentContent: commentContent,
                commentLike: 0,
                commentCommentator: this.userInfo.userName,
                commentatorId: this.userInfo.userId,
            }
            //发送评论
            postComment(comment).then((res) => {
                //发送成功刷新获取评论
                this.getComments();
            }).catch((error) => {
                console.log(error);
            })
        },
        getComments() {
            getCommentsByArticleId(this.article.articleId).then((res) => {
                this.comments = res.data;
            }).catch((error) => {
                console.log(error);
            })
        },
        updateCharCount() {
            this.charCount = this.commentInput.length;
        },
        //点赞
        likeComment(commentId) {
            console.log(commentId);
            likeComment(commentId,this.userInfo.userId).then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
})

</script>


<style scoped>
.container {
    display: flex;
}

.aside-content {
    width: 15%;
}

.aside-button {
    display: flex;
    justify-content: center;
    align-items: center;

}

.aside-other-function {
    position: relative;
    left: 50%;
}

.exit-button {
    width: 90%;
    padding: 5px 10px;
    background-color: transparent;
    border: 1px solid grey;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.function-container {
    margin-top: 5px;
    width: 35%;
    display: flex;
    cursor: pointer;
    padding: 3px;
    border: 1px solid grey;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.main-content {
    width: 90%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid grey;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
}

.article-info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1%;
    border-bottom: 1px solid rgb(190, 190, 190);
}

.article-info-articleName {
    font-weight: bolder;
    font-size: xx-large;
}

.article-content-container {
    margin-top: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    display: block;
    width: 100%;
    overflow-x: hidden;
}



.aritcle-info-author {
    color: rgb(0, 0, 255);
    cursor: pointer;
}

.article-other-container {
    border-top: 1px solid rgb(190, 190, 190);
    margin-top: 10px;
    padding: 5px 0;
}

.label-text {
    padding: 3px;
}

.label-content {
    padding: 1px;
    color: white;
    border: 1px solid rgb(160, 160, 160);
    background-color: rgb(160, 160, 160);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}

.article-comment-container {
    width: 90%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid grey;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
}


.comment-area-topic {
    font-weight: bolder;
    font-size: xx-large;
    font: 900 50px;
    padding-bottom: 5px;
    border-bottom: 1px solid grey;
}

.article-comment {
    display: flex;
    border: 1px solid rgb(200, 200, 200);
    padding: 5px;
    justify-content: space-between;
}

.article-textarea {
    margin-top: 5px;
    width: 99%;
    height: 50px;
    resize: none;
    overflow: auto;
    background-color: #EEEEEE;
    font-size: large;
    transition: height 0.3s;
}

.article-textarea:focus {
    background-color: white;
    height: 100px;
}

.article-textarea::placeholder {
    font-size: large;
}

.article-input-area {
    width: 100%;
}

.comment-other {
    width: 8%;

    height: fit-content;
    display: block;
    padding: 5px;
}

.button-sent {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    color: white;
    background-color: #4e83fe;
}

.article-comment-like {
    width: 8%;
    height: fit-content;
    cursor: pointer;
    border: 1px solid #EEEEEE;
    background-color: #EEEEEE;
    border-radius: 5px;
    padding: 1px;
    user-select: none;
    transition: border 0.5s;
}

.article-comment-like:hover {
    border-color: black;
}

.article-comment-like:active {
    border-radius: 0;
}
</style>