import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
    state: () => ({
        articleRuleState: "comprehensive", //选择文章展示的分类方式 默认是综合
        articleShowMethod: "recommend", //默认是推荐
        articles: [], //获取的文章列表
        publishArticle: {
            topic: "",
            author: "",
            date: "",
            content: "",
            tag: "",
        }
    }),

    actions: {
        setArticleRuleState(activeRule) {
            this.articleRuleState = activeRule;
        },
        setArticles(articles) {
            this.articles = articles;
        },
        setArticleShowMethod(method) {
            this.articleShowMethod = method;
        },
        //给即将发布的article赋值
        setPublishArticle(article) {
            this.publishArticle.topic = article.topic;
            this.publishArticle.author = article.author;
            this.publishArticle.date = article.date;
            this.publishArticle.content = article.content;
            if (article.tag != undefined) {
                this.publishArticle.tag = article.tag;
            }
            this.publishArticle.tag = "";
        }
    }
})