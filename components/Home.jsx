import styles from "../styles/mystyles.module.css"
import { Link } from "react-router-dom";

const Home = ()=>{
    return(
        <div className={styles.home}>
            <h1>Home</h1>
            <h2>Want to catch up on all the stories?</h2>
            <button>
                <Link to="/articles">
                    View All Articles
                </Link>
                </button>

            <h2>Featured Articles</h2>
        </div>
    )
}

export default Home