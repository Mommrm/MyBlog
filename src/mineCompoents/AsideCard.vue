<template>
    <div>
        <div class="aside-container">
            <div class="aside-content">
                <div class="aside-title-contianer">
                    发布文章
                </div>
                <div class="rule-container">
                    <div class="container-text" style="display: flex;">
                        <div style="color: red;">*</div>
                        分类:
                    </div>
                    <div class="aside-content-articlerule" v-for="rule in rules" :key="rule.ruleIndex">
                        <input type="radio" class="rule-item" v-model="selectedrule" :value="rule.classify">{{ rule.ruleName
                        }}
                    </div>
                </div>
                <div class="aside-content-tagContainer" style="margin: 10px 0;">
                    <div style="display: flex;">
                        <div style="color: red;">*</div>
                        <div>添加标签: </div>
                        <div class="tags-container">{{ selectTagContent }}
                            <div class="aside-tags">
                                <div class="aside-content-articleTag" v-for="tag in tags" :key="tag.tagIndex"
                                    @click="selectTags(tag.tagIndex)">
                                    <div class="tag">{{ tag.tagName }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aside-content-articleAbstract">
                    <div class="container-text" style="display: flex;">
                        文章摘要:
                    </div>
                    <textarea placeholder="描述一下你的文章" v-model="articleAbstract"></textarea>
                </div>
                <div class="aside-content-button">
                    <button class="primary-button" @click="upLoadArticle">发布文章</button>
                    <button class="normal-button" @click="cancelUpload">取消发布</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
const { createArticle } = require('../axios/articlesRequest')
import { useArticleStore } from '@/stores/article';
import { useIndexStore } from '@/stores';
import { storeToRefs } from 'pinia';

export default ({
    props: {
        articleTitle: "",
    },
    setup() {
        const articleStore = useArticleStore();
        const userStore = useIndexStore();

        const { publishArticle } = storeToRefs(articleStore);
        const { userInfo } = storeToRefs(userStore);
        const { setPublishArticle } = articleStore;

        return {
            publishArticle,
            userInfo,
            setPublishArticle,
        }
    },
    data() {
        return {
            rules: [
                {
                    ruleName: "前端",
                    classify: "fore-web",
                    ruleIndex: 1,
                },
                {
                    ruleName: "后端",
                    classify: "rear-web",
                    ruleIndex: 2,
                },
                {
                    ruleName: "工具框架",
                    classify: "tool",
                    ruleIndex: 3,
                },
                {
                    ruleName: "其他",
                    classify: "other",
                    ruleIndex: 4,
                }
            ],
            tags: [
                {
                    tagName: "HTML",
                    classify: "fore-web",
                    tagIndex: 1,
                },
                {
                    tagName: "CSS",
                    classify: "fore-web",
                    tagIndex: 2,
                },
                {
                    tagName: "JavaScript",
                    classify: "fore-web",
                    tagIndex: 3,
                },
                {
                    tagName: "Vue",
                    classify: "fore-web",
                    tagIndex: 4,
                },
                {
                    tagName: "Java",
                    classify: "rear-web",
                    tagIndex: 5,
                },
                {
                    tagName: "Mysql",
                    classify: "rear-web",
                    tagIndex: 6,
                },
                {
                    tagName: "Redis",
                    classify: "rear-web",
                    tagIndex: 7,
                },
                {
                    tagName: "SpringBoot",
                    classify: "tool",
                    tagIndex: 8,
                },
                {
                    tagName: "SpringCloud",
                    classify: "tool",
                    tagIndex: 9,
                },

            ],
            tempArticle: {
                name: "",
                author: "",
                date: "",
                content: "",
                abstract: "",
                rule: "",
                authorId: 0,
            },
            selectedrule: "",
            articleAbstract: "",
            selectTagContent: "请选择文章标签",
        }
    },
    methods: {
        upLoadArticle() {
            this.tempArticle.name = this.articleTitle;
            this.tempArticle.author = this.publishArticle.author;
            this.tempArticle.date = this.publishArticle.date;
            this.tempArticle.content = this.publishArticle.content;
            this.tempArticle.abstract = this.articleAbstract;
            this.tempArticle.rule = this.selectedrule;
            this.tempArticle.authorId = this.userInfo.userId;
            this.tempArticle.tag = this.selectTagContent;
            if (this.tempArticle.name != "") {
                //发布文章
                createArticle(this.tempArticle)
                    .then((res) => {
                        console.log(res);
                        this.$router.push("/community");
                    }).catch((error) => {
                        console.log(error);
                    });
            }
            else {
                console.log("文章标题不能为空");
            }

        },
        cancelUpload() {
            //子组件向父组件传递值，触发事件是cancel，父组件@cancel调用此自定义事件，传递false过去
            this.$emit('cancel', false);
        },
        selectTags(tagsIndex) {
            this.selectTagContent = this.tags[tagsIndex - 1].tagName;
        }
    }

})

</script>


<style scoped>
.aside-container {
    width: 100%;
    height: 100%;
}

.aside-content {
    display: block;
}

.aside-title-contianer {
    font-size: x-large;
    border-bottom: 1px solid rgb(200, 200, 200);
    padding: 3%;
    margin-bottom: 2%;
}

.rule-container {
    display: flex;
    margin-bottom: 5%;
}

.aside-content-articleAbstract {
    display: flex;
    margin-bottom: 5%;
    justify-content: center;
    align-items: center;
}

.aside-content-articleAbstract {
    height: 8rem;
}

.aside-content-articleAbstract textarea {
    width: 80%;
    height: 100%;
    padding: 5px;
    resize: none;
}

.aside-content-button {
    display: flex;
    justify-content: right;
}

.primary-button {
    background-color: rgb(20, 109, 252);
    border: 1px solid black;
    border-radius: 5px;
    color: white;
    padding: 10px 20px;
    flex-shrink: 0;
    cursor: pointer;
}

.normal-button {
    margin: 0 10px;
    background-color: transparent;
    border: 1px solid;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    padding: 10px;
    flex-shrink: 0;
    cursor: pointer;
}

.tags-container {
    display: block;
    cursor: pointer;
    border: 1px solid rgb(210, 210, 210);
    width: 70%;
    padding: 5px;
}

.aside-tags {
    display: none;
}

.aside-content-articleTag {
    padding: 3px;
}

.aside-content-articleTag:hover {
    background-color: rgb(240, 240, 240);
}

.tags-container:hover .aside-tags {
    display: block;
    position: fixed;
    background-color: #fff;
}
</style>