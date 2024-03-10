const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:8077',
})

//发送评论
export const postComment = (comment) => {
    return api.post(`/comment/sent`, {
        articleId: comment.articleId,
        commentContent: comment.commentContent,
        commentLike: comment.commentLike,
        commentatorId: comment.commentatorId,
        commentCommentator: comment.commentCommentator,
    })
}

//获取文章评论
export const getCommentsByArticleId = (articleId) => {
    return api.get(`/comment/getcomment`, {
        params: {
            articleId: articleId,
        }
    })
}
//评论点赞
export const likeComment = (commentId, userId) => {
    return api.put(`/comment/like`, null, {
        params: {
            commentId: commentId,
            userId: userId,
        }   
    })
}