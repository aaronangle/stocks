import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import styles from "../style.module.css";
import LoadingSpinner from "../utititlyComponents/LoadingSpinner/LoadingSpinner";
import { useQuery } from '@apollo/react-hooks';
import { GET_SYMBOLS } from "../graphql/query";

const Home = (props) => {
    const [modalShowing, setModalShowing] = useState(false);

    const { loading, error, data } = useQuery(GET_SYMBOLS);

    if (loading) return (
        <div className={styles.loadingContainer}>
            <LoadingSpinner />
        </div>
    );
    if (error) return `Error! ${error.message}`;
    const symbolNames = [];
    data.symbols[0].symbol.forEach(element => {
        symbolNames.push(element.name)
    });

    return (
        <div>
            <Navbar show={true} />
            <div className={styles.stockContainer}>
                {data.symbols[0].symbol.map((element, index) => {
                    return <Card name={element.name} modalShowing={modalShowing} setModalShowing={setModalShowing} key={index} />
                })}
            </div>
        </div>
    )
}

export default Home;