import { useEffect, useState } from "react";
import styles from "../styles/mystyles.module.css"

const ArticleCard = ({ article })=>{
      
    return(
        <section className={styles.articleOverview}>
            <li >
                <h3>Title: {article.title}</h3>
                <p>Author: {article.author} </p>
                <p>Posted at {article.created_at}</p>
            </li>
        </section>
    )
}

export default ArticleCard