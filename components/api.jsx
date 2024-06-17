import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-jn.onrender.com/api"
})

export const fetchArticles = ()=>{
    return ncNewsApi
        .get("/articles")
        .then((articles)=>{
            return articles.data.articles;
        })
}