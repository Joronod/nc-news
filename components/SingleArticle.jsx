import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle, fetchComments } from '../api';
import styles from "../styles/mystyles.module.css";
import CommentCard from "./CommentCard";
import VotesCard from "./VotesCard"

const SingleArticle = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

    useEffect(() => {
        console.log("Using Effect")
        fetchArticle(article_id).then((articleFromApi) => {
            setArticle(articleFromApi);
            setIsLoading(false);
        });
        fetchComments(article_id).then((commentsFromApi) => {
            setComments(commentsFromApi);
            setCommentsLoading(false);
        }).catch((err)=>{
            setCommentsLoading(false);
        })
    }, [article_id]);
    


    if (isLoading) return <h2>The Raven is on the way...</h2>;
    if (commentsLoading) return <h2>Let's hear what the people think...</h2>;

    return (
        <section className={styles.singleArticle}>
            <div className={styles.singleArticleContent}>
                <h2>{article.title}</h2>
                <img src={article.article_img_url} alt={article.title} className={styles.articleImage} />
                <h3>by {article.author}</h3>
                <p>posted at {new Date(article.created_at).toLocaleString()}</p>
                <p>{article.body}</p>
            </div>
            <div className={styles.votes}>
                <VotesCard article_id={article_id} initialVotes={article.votes} />
            </div>
            <div className={styles.comments}>
                <h3>What do the people think?</h3>
                <button><h4>post comment</h4></button>
                <ul className={styles.allComments}>
                    {comments.map((comment) => (
                        <CommentCard key={comment.comment_id} comment={comment} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default SingleArticle;