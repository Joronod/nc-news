import styles from "../styles/mystyles.module.css";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../api";

const FeaturedArticle = () => {
    const [articles, setArticles] = useState([]);
    const [randomArticle, setRandomArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRandomArticle = (articles) => {
        const randomIndex = Math.floor(Math.random() * articles.length);
        return articles[randomIndex];
    };

    useEffect(() => {
        fetchArticles("date", "desc")
            .then((articlesFromApi) => {
                setArticles(articlesFromApi);
                const randomArticle = getRandomArticle(articlesFromApi);
                setRandomArticle(randomArticle);
                setIsLoading(false);
            })
            .catch((error) => {
                setError("Failed to load Articles");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <h2>The Raven is on the way</h2>;
    if (error) return <p>{error}</p>;

    return (
        <section className={styles.featuredArticleCard}>
            {randomArticle && <ArticleCard article={randomArticle} />}
        </section>
    );
};

export default FeaturedArticle;
