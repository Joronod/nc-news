import { useEffect, useState } from "react";
import styles from "../styles/mystyles.module.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ article })=>{
    const article_id = article.article_id
    return(
        <section className={styles.articleOverview}>
            <Link to={`/articles/${article_id}`}>
                <li key={article_id}>
                    <h3>Title: {article.title}</h3>
                    <p>Author: {article.author} </p>
                    <p>Posted at {new Date(article.created_at).toLocaleString()}</p>
                </li>
            </Link>
        </section>
    )
}

export default ArticleCard