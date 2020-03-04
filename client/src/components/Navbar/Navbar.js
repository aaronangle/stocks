import React, { useState } from "react";
import styles from "./style.module.css";
import { ADD_SYMBOL, GET_SYMBOLS } from "../../graphql/query";
import { useMutation } from '@apollo/react-hooks';

const Navbar = () => {
    const [input, setInput] = useState("");
    const [name, { data }] = useMutation(ADD_SYMBOL);
    function addSymbol() {
        if (input !== "") {
            name({
                variables: { name: input.toUpperCase() },
                refetchQueries: [{ query: GET_SYMBOLS }]
            })
                .then(res => {
                    console.log(res)
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