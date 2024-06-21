import styles from "../styles/mystyles.module.css"
import React from "react"

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <p>It looks like that page does not exist...</p>
        </div>
    )
}

export default NotFound

