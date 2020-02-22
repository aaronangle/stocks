import React, { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";

const Navbar = () => {
    const [input, setInput] = useState("");

    function addSymbol() {
        if (input !== "") {
            axios.post("/api/add", {
                symbol: input
            })
                .then(res => {
                })
        }
        setInput("")
    }

    return (
        <div className={styles.navbar}>
            <h2 className={styles.title}>Stock</h2>
            <div className={styles.search}>
                <input className={styles.input} placeholder="Add A Stock Symbol" value={input} onChange={(e) => setInput(e.target.value)}></input>
                <h1 className={styles.add} onClick={addSymbol}>+</h1>
            </div>
        </div>
    )
}

export default Navbar;