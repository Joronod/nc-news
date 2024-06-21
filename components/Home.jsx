import { useEffect, useState } from "react";
import styles from "../styles/mystyles.module.css";
import { Link, useParams } from "react-router-dom";
import { fetchArticlesByTopic, fetchTopics } from "../api";
import ArticleCard from "./ArticleCard";
import Sorting from "./Sorting";

const Home = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const { topic } = useParams();
    const [sortBy, setSortBy] = useState("date");
    const [order, setOrder] = useState("desc");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopics().then((topicsFromApi) => {
            setTopics(topicsFromApi);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (topic) {
            setIsLoading(true);
            fetchArticlesByTopic(topic, sortBy, order)
                .then((articlesFromApi) => {
                    setFilteredArticles(articlesFromApi);
                    setIsLoading(false);
                    if (articlesFromApi.length === 0) {
                        setError(`No articles found for topic: ${topic}`);
                    } else {
                        setError(null);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError("Failed to fetch articles. Please try again.");
                });
        }
    }, [topic, sortBy, order]);

    if (isLoading) return <h2>The Raven is on the way</h2>;

    return (
        <div className={styles.home}>
            <h1>Home</h1>
            <h2>Want to catch up on all the stories?</h2>
            <button>
                <Link to="/articles">View All Articles</Link>
            </button>
            <section className={styles.topics}>
                <nav className={styles.topicsBanner}>
                    <h2>Topics</h2>
                    <ul className={styles.topicButtons}>
                        {topics.map((topic) => (
                            <div className={styles.topicContainer} key={topic.slug}>
                                <button className={styles.topic}>
                                    <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
                                </button>
                                <p className={styles.descriptionText}>{topic.description}</p>
                            </div>
                        ))}
                    </ul>
                </nav>
                {!topic ? (
                    <h3>Featured Articles</h3>
                ) : (
                    <section className={styles.filteredTopics}>
                        <h3>Displaying articles on {topic}</h3>
                        <Sorting sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            filteredArticles.map((article) => <ArticleCard key={article.article_id} article={article} />)
                        )}
                    </section>
                )}
            </section>
        </div>
    );
};

export default Home;
