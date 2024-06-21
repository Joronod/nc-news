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
        .catch((error)=>{
            throw new Error("Unable to fetch topics")
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
            return response.data.articles;
        })
        .catch((error)=>{
            throw new Error("Unable to fetch articles")
        })
        
};

export const fetchArticlesByTopic = (topic, sortBy = "date", order = "desc") => {
    return ncNewsApi.get(`/articles`, {
        params: {
            topic: topic,
            sort_by: sortBy,
            order: order,
        },
    }).then((response) => {
        return response.data.articles;
    })
    .catch((error)=>{
        throw new Error("Unable to fetch articles")
    })
};

export const fetchArticle = (articleId) => {
    return ncNewsApi
        .get(`/articles/${articleId}`)
        .then((response) => {
            return response.data.article;
        })
        .catch((error)=>{
            throw new Error("Unable to fetch article")
        })
};

export const fetchComments = (articleId) =>{
    return ncNewsApi
        .get(`/articles/${articleId}/comments`)
        .then((response)=>{
            return response.data.comments
        })
        .catch((error)=>{
            throw new Error("Unable to fetch comments")
        })
    }

export const fetchUsers = () =>{
    return ncNewsApi
        .get("/users")
        .then((response) =>{
        return response.data
        })
        .catch((error)=>{
            throw new Error("Unable to fetch users")
        })
    }
    
export const increaseVotes = (articleId) => {
    return ncNewsApi
    .patch(`/articles/${articleId}`, {inc_votes: 1})
    .then((newVote)=>{
        return newVote.data.article.votes
    }).catch((error)=>{
        throw new Error("Please try again later")
    })
}

export const decreaseVotes = (articleId) => {
    return ncNewsApi
    .patch(`/articles/${articleId}`, {inc_votes: -1})
    .then((newVote)=>{
        return newVote.data.article.votes
    })
    .catch((error)=>{
        throw new Error("Please try again later")
    })
}

export const postComment = (articleId, comment) => {
    return ncNewsApi.post(`/articles/${articleId}/comments`, comment)
    .then((newComment)=>{
        return newComment.data.postedComment
    })
    .catch((error)=>{
        throw new Error("Please try again later")
    })
}

export const deleteComment = (comment_id) =>{
    return ncNewsApi.delete(`/comments/${comment_id}`)
    .then((deletedComment)=>{
        console.log(deleteComment)
    })
    .catch((error)=>{
        throw new Error("Please try again later")
    })
}

