import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import styles from "../style.module.css";
import { useQuery } from '@apollo/react-hooks';
import { GET_SYMBOLS } from "../graphql/query";

const Home = () => {
    const [symbols, setSymbols] = useState([]);
    const [modalShowing, setModalShowing] = useState(false);

    // useEffect(() => {

    // }, [])

    const { loading, error, data } = useQuery(GET_SYMBOLS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.symbols)
    setSymbols(data);

    return (
        <div>
            <Navbar />
            <div className={styles.stockContainer}>
                {symbols.map((element, index) => {
                    return <Card name={element} modalShowing={modalShowing} setModalShowing={setModalShowing} key={index} />
                })}
            </div>
        </div>
    )
}

export default Home;