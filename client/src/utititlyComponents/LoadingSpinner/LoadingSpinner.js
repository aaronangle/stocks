import React from "react";
import styles from "./style.module.css"

const LoadingSpinner = (props) => {


    return (
        <img src={require("./refresh.png")} className={styles.spinner} alt="Loading"></img>
    )
}

export default LoadingSpinner;