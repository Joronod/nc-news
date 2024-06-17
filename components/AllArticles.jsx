import styles from "../styles/mystyles.module.css"
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "./api";

const AllArticles = ()=>{
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        console.log("Using Effect!")
        fetchArticles().then((articlesFromApi)=>{
            setArticles(articlesFromApi)
            setIsLoading(false)
        });
    }, [])

    if(isLoading) return <h2>Stop the Press!</h2>

    if(!isLoading){

        return(
            <section className={styles.allArticles}>
                <h2>All articles</h2>
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