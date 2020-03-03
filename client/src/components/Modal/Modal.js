import React from "react";
import styles from "./style.module.css";
import StockChart from "../Chart/Chart"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECOMMENDATION } from "../../graphql/query";
import 'react-circular-progressbar/dist/styles.css';

const Modal = (props) => {
    const { name, changeShow, setModalShowing } = props;

    const { loading, error, data } = useQuery(GET_RECOMMENDATION, { variables: { name } });

    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    const { buy, sell, hold, strongBuy, strongSell } = data.recommendation[0];


    function closeModal() {
        setModalShowing(false);
        changeShow(false);
    }

    const indicators = [
        {
            value: buy,
            name: "Buy",
        },
        {
            value: hold,
            name: "Hold",
        },
        {
            value: sell,
            name: "Sell",
        },
        {
            value: strongBuy,
            name: "Strong Buy",
        },
        {
            value: strongSell,
            name: "Strong Sell",
        },
    ]
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <h2 onClick={() => closeModal()} className={styles.close}><span className={styles.closeButton}>X</span></h2>
                <div className={styles.header}>
                    <h1 className={styles.title}>{name}</h1>
                </div>
                <hr></hr>
                <div className={styles.innerCardHolder}>
                    <div className={styles.cardText}>
                        {indicators.map((element, index) => {
                            return (
                                <div key={index} className={styles.circle}>
                                    <CircularProgressbar className={styles.progressBar} value={element.value} maxValue={30} minValue={0} text={`${element.name}: ${element.value}`} styles={buildStyles({
                                        textSize: "13px",
                                    })} />
                                </div>
                            )
                        })
                        }
                    </div>
                    <div>
                        <StockChart name={name} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;