import React from "react";
import styles from "./style.module.css";
import moment from "moment";

const CompanyNewsCard = (props) => {
    const { category, datetime, headline, id, image, related, source, summary, url } = props.details;
    return (
        <div className={styles.card}>
            <h5>{moment.unix(datetime).format("MMM Do YYYY")}</h5>
            <h3>{headline.split(" ").slice(0, 18).join(" ")}</h3>
            <img src={image} className={styles.image} alt="company news"></img>
            <p>{summary.split(" ").slice(0, 25).join(" ").concat("....")}</p>
            <a href={url} target="_blank">Read More</a>
        </div>
    )
}

export default CompanyNewsCard;