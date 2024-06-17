import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-jn.onrender.com/api"
});

export const fetchArticles = () => {
    return ncNewsApi
        .get("/articles")
        .then((response) => {
            return response.data.articles;
        });
};

export const fetchArticle = (articleId) => {
    return ncNewsApi
        .get(`/articles/${articleId}`)
        .then((response) => {
            return response.data.article;
        });
};

export const fetchComments = (articleId) =>{
    return ncNewsApi
        .get(`/articles/${articleId}/comments`)
        .then((response)=>{
            return response.data.comments
        })
        
    }

export const fetchUsers = () =>{
    return ncNewsApi
        .get("/users")
        .then((response) =>{
        return response.data
        })
    }
    
export const increaseVotes = (articleId) => {
    return ncNewsApi
    .patch(`/articles/${articleId}`, {inc_votes: 1})
    .then((newVote)=>{
        return newVote.data.article.votes
    }).catch(err)
}

export const decreaseVotes = (articleId) => {
    return ncNewsApi
    .patch(`/articles/${articleId}`, {inc_votes: -1})
    .then((newVote)=>{
        return newVote.data.article.votes
    })
}

export const postComment = (articleId, comment) => {
    return ncNewsApi.post(`/articles/${articleId}/comments`, comment)
    .then((newComment)=>{
        return newComment.data.postedComment
    })
}
