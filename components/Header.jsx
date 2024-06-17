import styles from "../styles/mystyles.module.css"
import { Link } from "react-router-dom";

const Header = ()=>{
    return(
        <header className={styles.header}>
            <h1>NC News</h1>

            <button>
                <Link to="/">NC News</Link>
            </button>

        </header>
    )
}

export default Header;