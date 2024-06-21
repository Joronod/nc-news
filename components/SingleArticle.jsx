import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle, fetchComments } from '../api';
import styles from "../styles/mystyles.module.css";
import CommentCard from "./CommentCard";
import VotesCard from "./VotesCard";
import PostCommentCard from './PostCommentCard';
import { UserContext } from '../src/UserContext';

const SingleArticle = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const { user } = useContext(UserContext);
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log("Using Effect");
        fetchArticle(article_id).then((articleFromApi) => {
            setArticle(articleFromApi);
            setIsLoading(false);
        });
        fetchComments(article_id).then((commentsFromApi) => {
            setComments(commentsFromApi);
            setCommentsLoading(false);
        }).catch((err) => {
            setError("Please refresh the page")
            setCommentsLoading(false);
        });
    }, [article_id]);

    const addComment = (newComment, isFinal = false) => {
        setComments((previousComments)=>{
            if(isFinal){
                return previousComments.map((comment)=>{
                    comment.id === newComment.id ? newComment : comment
                })
            } else {
                return [newComment, ...previousComments]
            }
        })


        setComments([newComment, ...comments]);
    };

    const deleteCommentFromList = (commentId) => {
        setComments(comments.filter(comment => comment.comment_id !== commentId));
    };

    if (isLoading) {
        return <div className={styles.loader}></div>;
    }
    if(error) return <h2>{error}</h2>
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
                {user.username !== null ? <PostCommentCard article_id={article_id} addComment={addComment} /> : <p>Please log in to post a comment</p>}
                <ul className={styles.allComments}>
                    {comments.map((comment) => (
                        <CommentCard key={comment.comment_id} comment={comment} onDelete={deleteCommentFromList} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default SingleArticle;
