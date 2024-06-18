import styles from "../styles/mystyles.module.css"


const Sorting = ({ sortBy, setSortBy, order, setOrder })=>{
    const handleSortChange = (event) =>{
        setSortBy(event.target.value)
    }

    const handleOrderChange = ()=> {
        setOrder((lastOrder)=> (lastOrder === "asc" ? "desc" : "asc" ))
    }

    return (
        <div className={styles.sorting}>
            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by" value={sortBy} onChange={handleSortChange}>
                <option value="date">Date</option>
                <option value="comment_count">Number of Comments</option>
                <option value="votes">Votes</option>
            </select>
            <button onClick={handleOrderChange}>
                {order === "asc"? "Descending" : "Ascending"}
            </button>
        </div>
    )




}

export default Sorting