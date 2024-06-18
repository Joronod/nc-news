import styles from "../styles/mystyles.module.css";

const CommentCard = ({ comment }) =>{
    return (
        <section className={styles.comment}>
            <li>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
                <p>Posted at {new Date (comment.created_at).toLocaleString()}</p>
                <p>Votes: {comment.votes}</p>
            </li>
        </section>
    )
}

export default CommentCard