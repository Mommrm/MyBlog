const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:8077',
})
// 获取文章列表
// pageNum要求以0 10 20发送
export const getArticles = (pageNum) => {
    return api.get(`/article/getlist`, {
        params: {
            listPageNum: pageNum,
        }
    });
};
// 根据文章id获取文章内容
export const getAtContentById = (articleId) => {
    return api.get("/article/getcontent", {
        params: {
            articleId: articleId,
        }
    })
}
//创建文章
export const createArticle = (article_name, article_author, article_date, article_content) => {
    return api.post("/article/create", {
        articleName: article_name,
        articleAuthor: article_author,
        articleDate: article_date,
        articleContent: article_content,
    })
}