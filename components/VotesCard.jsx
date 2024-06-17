import styles from "../styles/mystyles.module.css";
import { useEffect, useState } from 'react';
import { increaseVotes, decreaseVotes } from "../api";

const VotesCard =({ article_id, initialVotes }) =>{
    const [votes, setVotes] = useState(initialVotes);
    const [userVote, setUserVote] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleUpvote = () => {
        try {

            if (userVote === 1) {
                setVotes(votes - 1);
                setErrorMsg(null)
                setUserVote(0);
                decreaseVotes(article_id);
            } else if (userVote === -1) {
                setVotes(votes + 2);
                setErrorMsg(null);
                setUserVote(1);
                increaseVotes(article_id);
                increaseVotes(article_id);
            } else {
                setVotes(votes + 1);
                setErrorMsg(null);
                setUserVote(1);
                increaseVotes(article_id);
            }
        } catch {
           console.log(errorMsg) 
           setErrorMsg("The raven got lost. Please send another.") 
        }
    }

    const handleDownvote = () => {
        try {

            if (userVote === -1) {
                setVotes(votes + 1);
                setErrorMsg(null);
                increaseVotes(article_id);
            setUserVote(0);
        } else if (userVote === 1) {
            setVotes(votes - 2);
            setErrorMsg(null);
            decreaseVotes(article_id);
            decreaseVotes(article_id);
            setUserVote(-1);
        } else {
            setVotes(votes - 1);
            setErrorMsg(null);
            decreaseVotes(article_id);
            setUserVote(-1);
            }
        } catch {
            console.log(errorMsg)
            setErrorMsg("The raven got lost. Please send another.") 
        }
    }

    return (
        <div>
            <h4>votes: {votes}</h4>
                    <button className={`styles.voteButton  ${userVote === 1 ? styles.upvoteButtonActive : styles.upvoteButton}`} 
                    aria-label='Upvote' 
                    onClick={handleUpvote} >
                        {userVote === 1 ? '*Undo Upvote*' : '*Upvote*'}
                    </button>
                    <button className={`styles.voteButton ${userVote === -1 ? styles.downvoteButtonActive : styles.downvoteButton}`}
                    aria-label='Downvote' onClick={handleDownvote}>
                        {userVote === -1 ? '*Undo Downvote*' : '*Downvote*'}
                    </button>
                    {errorMsg ? <p>{errorMsg}</p> : null }
        </div>
    )

}

export default VotesCard
    