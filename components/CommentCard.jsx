import styles from "../styles/mystyles.module.css";
import { UserContext } from '../src/UserContext';
import { useContext, useEffect, useState } from 'react';


const CommentCard = ({ comment }) =>{
    const { user } = useContext(UserContext)
    
    const handleDelete = (event) =>{
        console.log(event)
    }
    
    return (
        <section className={styles.comment}>
            <li>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
                <p>Posted at {new Date (comment.created_at).toLocaleString()}</p>
                <p>Votes: {comment.votes}</p>
                {user && user.username===comment.author ? <button className={styles.deleteButton} onClick={handleDelete}>Delete</button> : null}
            </li>
        </section>
    )
}

export default CommentCard