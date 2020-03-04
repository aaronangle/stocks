import React from "react";
import styles from "./style.module.css";

const CompanyNewsCard = (props) => {
    const { category, datetime, headline, id, image, realted, source, summary, url } = props.details;
    return (
        <div className={styles.card}>
            <h3>{headline.split(" ").slice(0, 18).join(" ")}</h3>
            <img src={image} className={styles.image} alt="company news"></img>
            <p>{summary.split(" ").slice(0, 25).join(" ").concat("....")}</p>
            <a href={url}>Read More</a>
        </div>
    )
}

export default CompanyNewsCard;