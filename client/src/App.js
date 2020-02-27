import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import styles from "./style.module.css";
import axios from "axios";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { GET_SYMBOLS } from "./graphql/query";

function App() {
  const [symbols, setSymbols] = useState([]);
  const [modalShowing, setModalShowing] = useState(false);

  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
  })

  useEffect(() => {
    let incomingSymbols = [];
    axios.get("/api/symbols")
      .then(res => {
        res.data[0].symbol.forEach(element => {
          incomingSymbols.push(element.name)
        })
        console.log(incomingSymbols)
        setSymbols(incomingSymbols)
      })
  }, [])


  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <div className={styles.stockContainer}>
          {symbols.map((element, index) => {
            return <Card name={element} modalShowing={modalShowing} setModalShowing={setModalShowing} key={index} />
          })}
        </div>
      </div>
    </ApolloProvider>
  )

}

export default App;
