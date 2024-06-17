import { useState } from "react";
import styles from "../styles/mystyles.module.css";
import { UserContext } from '../src/UserContext'
import { useContext } from "react";
import { postComment } from "../api";

const PostCommentCard = ({ article_id, addComment }) =>{
    const { user } = useContext(UserContext)

    const [comment, setComment] = useState({
        body: "",
        username: user ? user.username : "",
     })
    const [submitMsg, setSubmitMsg] = useState("")

    
    const handleChange=(event)=>{
        setComment({ ...comment, body: event.target.value })
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        postComment(article_id, comment)
            .then((postedComment)=>{
                setSubmitMsg("Your comment has been posted")
                addComment(postedComment)
                setComment({ ...comment, body:""})
            })
            .catch((error)=>{
                console.log(error)
                setSubmitMsg("Failed to post the comment, please try again.")
            })
        
    }

    if(!user){
        return <p>Please log in to post a comment.</p>
    }

    return (
        <section className={styles.postCommentCard}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="body" value={comment.body} required onChange={handleChange}/>
                </label>
                <button>Post</button>
            </form>
            <p>{submitMsg}</p>
        </section>
    )
}

export default PostCommentCard