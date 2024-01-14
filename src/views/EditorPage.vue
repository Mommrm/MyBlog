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
            <div class="bar-item">
                标题
            </div>
            <div class="bar-item">
                斜体
            </div>
            <div class="bar-item">
                粗体
            </div>
            <div class="bar-item">
                引用
            </div>
        </div>
        <div class="container-main">
            <div class="input-area">
                <div class="textarea-container">
                    <textarea class="input-textarea" v-model="article.content" placeholder="支持简单的markdown语法"
                        @input="inputText()" @keydown.enter="checkEnter"></textarea>
                </div>
            </div>
            <div class="show-area">
                <div class="body-preview" v-html="this.html"></div>
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
import { useIndexStore } from "../stores/index"
const { createArticle } = require('../axios/articlesRequest')

export default ({
    setup() {
        const store = useIndexStore();

        const { userInfo } = store.$state;

        return {
            userInfo,
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
            html: "",
        }
    },
    mounted() {
        setInterval(() => {
            this.html = this.parseMarkdown(this.article.content);
        }, 2000);
    },
    methods: {
        //输入时调用更新文章内容
        inputText() {
            this.textNum = this.article.content.length;
        },
        //更新行数
        checkEnter(event) {
            if (event.key === "Enter") {
                console.log(this.enterNum);
                this.enterNum++;
            }
        },
        parseMarkdown(markdown) {
            // 创建一个匹配所有Markdown语法的正则表达式
            const regex = /^#{1,6}/;
            // 将Markdown字符串拆分成行
            const lines = markdown.split('\n');
            // 遍历每一行，将Markdown语法替换为HTML
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // 匹配当前行中的Markdown语法
                const match = regex.exec(line);
                // 如果有匹配结果，则将Markdown语法替换为HTML
                if (match) {
                    console.log(match)
                    lines[i] = this.parseHeading(match[0], match[0].length);
                }
            }
            // 将行重新合并成单个字符串
            return lines.join('\n');
        },
        parseHeading(text, num) {
            var tempHTML = `<h` + num + `>` + `${text}` + `</h` + num + `>`
            console.log(tempHTML);
            // 将Markdown的标题语法转换为HTML
            return tempHTML;
        },
        saveToDraft() {
            //redis缓存草稿 并退出发布页面
            this.$router.push("/community");
        },
        publishArticle() {
            const now = Date.now();
            this.article.date = new Date(now);
            this.article.author = this.userInfo.userName;

            //发布文章
            createArticle(this.article.topic, this.article.author, this.article.date, this.html)
                .then((res) => {
                    console.log(res);
                    this.$router.push("/community");
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
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
    background-color: rgb(231, 231, 231);
}

.container-main {
    display: flex;
    justify-content: center;
    width: 100%;
}

.input-area {
    width: 50%;
    background-color: #eee;
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
    background-color: #eee;
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