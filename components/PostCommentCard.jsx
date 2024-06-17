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
    const [posting, setPosting] = useState(false)

    
    const handleChange=(event)=>{
        setComment({ ...comment, body: event.target.value })
    }

    const handleSubmit = (event) =>{
        console.log(event.target)
        event.preventDefault()
        setPosting(true)
        const optimisticComment = { ...comment, id: Date.now() }
        addComment(optimisticComment)
        setComment({ ...comment, body:""})
        postComment(article_id, comment)
            .then((postedComment)=>{
                setPosting(false)
                setSubmitMsg("Your comment has been posted")
                addComment(postedComment, true)
        })
        .catch((error)=>{
            console.log(error)
            setPosting(false)
            setSubmitMsg("Failed to post the comment, please try again.")
            addComment(optimisticComment, false)      
            })
        
    }

    if(!user){
        return <p>Please log in to post a comment.</p>
    }
    

    return (
        <section className={styles.postCommentCard}>
            <form onSubmit={handleSubmit}>
                <label>
                    <textarea
                        name="body"
                        value={comment.body}
                        required
                        onChange={handleChange}
                        rows="5"
                        cols="40"
                    />
                </label>
                {posting ? null : <button>Post</button> }
            </form>
            <p>{submitMsg}</p>
        </section>
    )
}

export default PostCommentCard