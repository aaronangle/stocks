import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import styles from "../style.module.css";
import { useQuery } from '@apollo/react-hooks';
import { GET_SYMBOLS } from "../graphql/query";

const Home = () => {
    const [modalShowing, setModalShowing] = useState(false);

    const { loading, error, data } = useQuery(GET_SYMBOLS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const symbolNames = [];
    data.symbols[0].symbol.forEach(element => {
        symbolNames.push(element.name)
    });


    return (
        <div>
            <Navbar />
            <div className={styles.stockContainer}>
                {symbolNames.map((element, index) => {
                    return <Card name={element} modalShowing={modalShowing} setModalShowing={setModalShowing} key={index} />
                })}
            </div>
        </div>
    )
}

export default Home;