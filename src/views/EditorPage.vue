<template>
    <div class="editorpage-container">
        <div class="container-topic">
            <div class="input-topic">
                <input type="text" placeholder="输入文字标题..." v-model="article.topic">
            </div>
            <div class="publish-logic">
                <button @click="saveToDraft" class="draft-button">存草稿</button>
                <button @click="publishArticle" class="publish-button">发布</button>
            </div>
        </div>
        <div class="container-menu-bar">
            <div class="bar-item" @click="HandleText(0)">
                标题
            </div>
            <div class="bar-item" @click="HandleText(1)">
                斜体
            </div>
            <div class="bar-item" @click="HandleText(2)">
                引用
            </div>
            <div class="bar-item" @click="HandleText(3)">
                代码
            </div>
        </div>
        <div class="container-main">
            <div class="input-area">
                <div class="textarea-container">
                    <textarea class="input-textarea" v-model="article.content" placeholder="支持简单的markdown语法"
                        @input="inputText()" @keydown.enter="checkEnter" id="text"></textarea>
                </div>
            </div>
            <div class="show-area">
                <div class="body-preview" v-html="this.html"></div>
            </div>
            <!-- 弹窗 -->
            <div class="aside-area" v-if="openAside">
                <AsideCard :articleTitle="article.topic" @cancel="(closeflag) => {
                    openAside = closeflag;
                }"></AsideCard>
            </div>
        </div>
        <div class="info-area">
            <div class="container-info-bar">
                <div class="bar-item">
                    字符数: {{ textNum }}
                </div>
                <div class="bar-item">
                    行数: {{ enterNum }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AsideCard from "@/mineCompoents/AsideCard.vue";
import { useIndexStore } from "../stores/index"
import { useArticleStore } from '@/stores/article';
import { parseMarkdown } from '../javaScript/markdownParse'
import { storeToRefs } from 'pinia';

export default ({
    setup() {
        const store = useIndexStore();
        const articleStore = useArticleStore();

        const { userInfo } = storeToRefs(store);
        const { publishArticle } = storeToRefs(articleStore);
        const { setPublishArticle } = articleStore;

        return {
            userInfo,
            publishArticle,
            setPublishArticle,
        };
    },
    components: {
        AsideCard,
    },
    //在未进入该组件时就执行
    beforeRouteEnter(to, from, next) {
        // 检查用户是否有权限访问该路由
        if (localStorage.getItem("token")) {
            next(); // 继续路由导航
        } else {
            next('/landpage'); // 重定向到错误页面或其他路由
        }
    },
    data() {
        return {
            textNum: 0,
            enterNum: 1,
            article: {
                articleId: -1,
                topic: "",
                author: "",
                date: "",
                abstract: "",
                content: "",
            },
            functions: [
                "head",
                "italic",
                "quote",
                "code"
            ],
            html: "",
            openAside: false,

        };
    },
    methods: {
        //输入时调用更新文章内容
        inputText() {
            //解析器调用
            this.html = parseMarkdown(this.article.content);
        },
        //更新行数
        checkEnter(event) {
            if (event.key === "Enter") {
                this.enterNum++;
            }
        },
        saveToDraft() {
            //redis缓存草稿 并退出发布页面
            this.$router.push("/community");
        },
        //发布文章
        publishArticle() {
            this.openAside = true; //
            const now = Date.now();
            this.article.date = new Date(now);
            this.article.author = this.userInfo.userName;
            const tempArticle = {
                topic: this.article.topic,
                author: this.article.author,
                date: this.article.date,
                content: this.article.content,
            }
            this.setPublishArticle(tempArticle);
        },

    },

})

</script>


<style scoped>
.editorpage-container {
    display: block;
}

.container-menu-bar {
    display: flex;
    border-top: 1px solid rgb(212, 212, 212);
    border-bottom: 1px solid rgb(212, 212, 212);
    margin-bottom: 3px;
}

.container-info-bar {
    display: flex;
    border-top: 1px solid rgb(212, 212, 212);
    border-bottom: 1px solid rgb(212, 212, 212);
    margin-bottom: 3px;
}

/* 标题栏 */
.container-topic {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input-topic {
    width: 100%;
}

.input-topic input {
    width: 75%;
    padding: 10px 40px;
    border: none;
    outline: none;
    font-size: x-large;
}

.publish-logic {
    display: flex;
    width: 10%;
    justify-content: space-around;
}

.draft-button {
    background-color: transparent;
    border: 1px solid;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    padding: 10px;
    flex-shrink: 0;
}

.publish-button {
    background-color: rgb(20, 109, 252);
    border: 1px solid black;
    border-radius: 5px;
    color: white;
    padding: 10px 20px;
    flex-shrink: 0;
}

.bar-item {
    padding: 2px 8px;
    cursor: pointer;
}

.bar-item:hover {
    background-color: rgb(247, 247, 247);
}

.container-main {
    display: flex;
    justify-content: center;
    width: 100%;
}

.input-area {
    width: 50%;
    border-left: 1px solid rgb(212, 212, 212);
}

.show-area {
    width: 50%;
    display: flex;
    border-left: 1px solid rgb(212, 212, 212);
}

.body-preview {
    width: 100%;
    height: 84vh;
    overflow-x: hidden;
    overflow-y: auto;
    word-wrap: break-word;
    word-break: break-all;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: grey;
}

.textarea-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
}

.input-textarea {
    width: 90%;
    min-height: 84vh;
    max-height: 90vh;
    border: none;
    outline: none;
    background-color: rgb(247, 247, 247);
    font-size: larger;
}

.aside-area {
    position: fixed;
    z-index: 1;
    width: 500px;
    height: 375px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media all and (max-width: 700px) {
    .show-area {
        display: none;
    }

    .input-area {
        width: 100%;
    }
}
</style>