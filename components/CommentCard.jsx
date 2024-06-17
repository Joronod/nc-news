import styles from "../styles/mystyles.module.css";
import { UserContext } from '../src/UserContext';
import { useContext, useState } from 'react';
import { deleteComment } from "../api";

const CommentCard = ({ comment, onDelete }) => {
    const { user } = useContext(UserContext);

    const [deleteMsg, setDeleteMsg] = useState("");
    const [isBeingDeleted, setIsBeingDeleted] = useState(false);
    const [check, setCheck] = useState(false);

    const handleClick = () => {
        setCheck(true);
    };

    const handleDelete = () => {
        setIsBeingDeleted(true);
        setCheck(false);
        deleteComment(comment.comment_id)
            .then(() => {
                setDeleteMsg("Comment deleted");
                setIsBeingDeleted(false);
                onDelete(comment.comment_id); 
            })
            .catch((error) => {
                console.log(error);
                setDeleteMsg("Failed to delete the comment, please try again.");
            });
    };

    if (isBeingDeleted) return (
        <div>
            <h4>Burning the comment</h4>
            <p>{deleteMsg}</p>
        </div>
    );

    if (check) return (
        <div>
            <h4>Are you sure you wish to delete this comment?</h4>
            <p>{comment.body}</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setCheck(false)}>No</button>
        </div>
    );

    return (
        <section className={styles.comment}>
            <li>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
                <p>Posted at {new Date(comment.created_at).toLocaleString()}</p>
                <p>Votes: {comment.votes}</p>
                {user && user.username === comment.author ? <button className={styles.deleteButton} onClick={handleClick}>Delete</button> : null}
            </li>
        </section>
    );
};

export default CommentCard;
