import styles from "../styles/mystyles.module.css"
import { Link } from "react-router-dom";
import { UserContext } from '../src/UserContext'
import { useContext } from "react";

const Header = ()=>{

    const { user } = useContext(UserContext)

    return(
        <header className={styles.header}>
            <h1><Link to="/">NC News</Link></h1>

            <button>
            <Link to="/users">Users</Link>
            </button>

        {user && (
            <div className={styles.userProfile}>
                <p>Logged in as {user.name}</p>
                <img src={user.avatar_url} className={styles.userAvatar} />
            </div>

        )}

        </header>
    )
}

export default Header;