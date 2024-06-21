import { useEffect, useState } from "react"
import styles from "../styles/mystyles.module.css"
import { fetchUsers } from "../api";
import UserCard from "./UserCard";

const Users = ()=>{
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(()=>{
        console.log("Using effect!")
        fetchUsers().then((usersFromApi)=>{
            setUsers(usersFromApi)
            setIsLoading(false)
        })
        .catch((error)=>{
            setError("Failed to load Users")
            setIsLoading(false)
        })
    },[])

    if(isLoading) return <h2>The Raven is on the way</h2>
    if(error) return <h2>{error}</h2>

    if(!isLoading){
        return(
            <section className={styles.usersOverview}>
                <h1>Please select your profile</h1>
                <ul className={styles.allUsers}>
                    {users.map((user)=>{
                        return <UserCard key={user.user_id} user={user} />
                    })}
                </ul>
            </section>
            )
    }
}

export default Users