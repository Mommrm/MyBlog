const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:8077',
})
// 获取文章列表
// pageNum要求以0 10 20发送
// queryRule: 
// comprehensive: 综合
// fore-web: 前端
// rear-web: 后端
// tool: 工具

//根据页数和获取分类规则获取文章列表 每次10条
export const getArticles = (pageNum, queryRule, method) => {
    return api.get(`/article/getlist`, {
        params: {
            listPageNum: pageNum,
            queryRule: queryRule,
            showMethod: method,
        }
    });
};

//根据用户id获取文章列表 获取用户所有发布的文章
export const getUserArticles = (userId) => {
    return api.get("/article/getuserarticles", {
        params: {
            userId: userId,
        }
    })
}

// 根据文章id获取文章内容
export const getAtContentById = (articleId) => {
    return api.get("/article/getcontent", {
        params: {
            articleId: articleId,
        }
    })
}
//创建文章
export const createArticle = (article) => {
    return api.post("/article/create", {
        articleName: article.name,
        articleAuthor: article.author,
        articleDate: article.date,
        articleContent: article.content,
        articleAbstract: article.abstract,
        articleRule: article.rule,
        authorId: article.authorId,
        articleTag: article.tag,
    })
}

//搜索文章 根据文章名字
export const searchArticle = (text) => {
    return api.get("/article/search", {
        params: {
            searchText: text,
        }
    })
}
//删除文章 根据文章Id 在用户空间中出现删除
export const deleteArticle = (articleId) => {
    return api.delete("/article/delete", {
        params: {
            articleId: articleId,
        }
    })
}