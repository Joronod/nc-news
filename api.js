import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-jn.onrender.com/api"
});

export const fetchTopics = () => {
    return ncNewsApi
        .get("/topics")
        .then((response)=>{
            return response.data
        })
}

export const fetchArticles = (sortBy = "date", order = "desc") => {
    return ncNewsApi
        .get("/articles", {
            params: {
                sort_by: sortBy,
                order: order
        }})
        .then((response) => {
            console.log(response.data.articles)
            return response.data.articles;
        });
};

export const fetchArticlesByTopic = (topic, sortBy = "date", order = "desc") => {
    return ncNewsApi.get(`/articles`, {
        params: {
            topic: topic,
            sort_by: sortBy,
            order: order,
        },
    }).then((response) => {
        console.log(response)
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

export const deleteComment = (comment_id) =>{
    return ncNewsApi.delete(`/comments/${comment_id}`)
    .then((deletedComment)=>{
        console.log(deleteComment)
    })
}