import React, { useState } from "react";
import styles from "./style.module.css";
import Modal from "../Modal/Modal";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";
import { useQuery } from '@apollo/react-hooks';
import { GET_QUOTE } from "../../graphql/query";

const Card = (props) => {
    const [show, changeShow] = useState(false);
    const { name, setModalShowing, modalShowing } = props;

    function showModal() {
        if (!modalShowing) {
            setModalShowing(true)
            changeShow(true)
        }
    }

    const { loading, error, data } = useQuery(GET_QUOTE, { variables: { name } });

    if (loading) return (
        <div className={styles.card}>
            <div className={styles.loadingCard}>
                <LoadingSpinner />
            </div>
        </div>
    );
    if (error) return `Error! ${error.message}`;
    const { o, h, l, c } = data.quote;
    const open = o;
    const high = h;
    const low = l;
    const current = c;

    return (
        <div className={styles.card}>
            <div onClick={() => showModal()} className={styles.innerCard}>
                <h2 className={styles.header}>{name}</h2>
                <hr></hr>
                <div className={styles.cardText}>
                    <p><span className={styles.text}>Open:</span> ${open}</p>
                    <p><span className={styles.text}>High:</span> ${high}</p>
                    <p><span className={styles.text}>Low:</span> ${low}</p>
                    <p><span className={styles.text}>Current:</span> ${current}</p>
                </div>
            </div>
            {show ? <Modal setModalShowing={setModalShowing} changeShow={changeShow} name={name} /> : <></>}
            <div className={styles.colorSplash}></div>
        </div>
    )
}

export default Card;