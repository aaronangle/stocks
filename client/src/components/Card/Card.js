import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Modal from "../Modal/Modal"
import axios from "axios"

// r = requests.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=bogh4o7rh5rej5i71mg0') quote
// r = requests.get('https://finnhub.io/api/v1/scan/pattern?symbol=AAPL&resolution=D&token=bogh4o7rh5rej5i71mg0') pattern recognition
// r = requests.get('https://finnhub.io/api/v1/scan/support-resistance?symbol=IBM&resolution=D&token=bogh4o7rh5rej5i71mg0') support resistance
// r = requests.get('https://finnhub.io/api/v1/calendar/ipo?token=bogh4o7rh5rej5i71mg0') ipo calendar
// bogh4o7rh5rej5i71mg0

const Card = (props) => {
    const [show, changeShow] = useState(false);
    const [state, setState] = useState({
        open: "",
        high: "",
        low: "",
        current: ""
    })
    const { name, setModalShowing, modalShowing } = props;

    function showModal() {
        if (!modalShowing) {
            setModalShowing(true)
            changeShow(true)
        }
    }

    axios.get(`/api/basicinfo/${name}`)
        .then(res => {
            const { o, h, l, c } = res.data.data
            setState(prevState => ({
                ...prevState,
                open: o,
                high: h,
                low: l,
                current: c
            }))
        })

    const { open, high, low, current } = state;
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