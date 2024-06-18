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