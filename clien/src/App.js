import React, { useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card"
import styles from "./style.module.css";
import axios from "axios"
// r = requests.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=bogh4o7rh5rej5i71mg0') quote
// r = requests.get('https://finnhub.io/api/v1/scan/pattern?symbol=AAPL&resolution=D&token=bogh4o7rh5rej5i71mg0') pattern recognition
// r = requests.get('https://finnhub.io/api/v1/scan/support-resistance?symbol=IBM&resolution=D&token=bogh4o7rh5rej5i71mg0') support resistance
// r = requests.get('https://finnhub.io/api/v1/calendar/ipo?token=bogh4o7rh5rej5i71mg0') ipo calendar
// bogh4o7rh5rej5i71mg0
function App() {
  const [symbols, setSymbols] = useState([]);
  const [modalShowing, setModalShowing] = useState(false);

  axios.get("/api/symbols")
    .then(res => {
      setSymbols(res.data[0].symbol)
    })


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

export default App;
