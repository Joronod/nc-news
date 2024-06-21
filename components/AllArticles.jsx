import styles from "../styles/mystyles.module.css"
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../api";
import Sorting from "./Sorting";

const AllArticles = ()=>{
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("date")
    const [order, setOrder] = useState("desc")
    const [error, setError] = useState(null)


    useEffect(()=>{
        fetchArticles(sortBy, order).then((articlesFromApi)=>{
            setArticles(articlesFromApi)
            setIsLoading(false)
        })
        .catch((error)=>{
            setError("Failed to load Articles")
            setIsLoading(false)
        })
    }, [sortBy, order])

    if(isLoading) return <h2>The Raven is on the way</h2>
    if(error) return <h2>{error}</h2>

    if(!isLoading){

        return(
            <section className={styles.allArticles}>
                <h2>All articles</h2>
                <Sorting sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
                <ul className={styles.articleCard} >
                    {articles.map((article)=>{
                        return <ArticleCard key={article.article_id} article={article} />
                    })}
                </ul>
            </section>
        )
    }

}

export default AllArticles