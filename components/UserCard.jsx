import { useContext } from "react";
import styles from "../styles/mystyles.module.css";
import { UserContext } from "../src/UserContext";

const UserCard = ({ user }) => {
    const { setUser } = useContext(UserContext);

    const handleUserClick = () => {
        setUser(user);
    };

    return (
        <section className={styles.userOverview} onClick={handleUserClick}>
            <li>
                <h3>Username: {user.username}</h3>
                <h4>Name: {user.name}</h4>
                <img src={user.avatar_url} alt="User Avatar"></img>
            </li>
        </section>
    );
}

export default UserCard;
