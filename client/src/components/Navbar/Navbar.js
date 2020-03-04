import React, { useState } from "react";
import styles from "./style.module.css";
import { ADD_SYMBOL, GET_SYMBOLS } from "../../graphql/query";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { show } = props;
    const [input, setInput] = useState("");
    const [name] = useMutation(ADD_SYMBOL);
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
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <h2 className={styles.title}>Stock</h2>
            </Link>
            {show ?
                <div className={styles.search}>
                    <input className={styles.input} placeholder="Add A Stock Symbol" value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <h1 className={styles.add} onClick={addSymbol}>+</h1>
                </div>
                : <div className={styles.search} style={{ visibility: 'hidden' }}>
                    <input className={styles.input} placeholder="Add A Stock Symbol" value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <h1 className={styles.add} onClick={addSymbol}>+</h1>
                </div>}
        </div>
    )
}

export default Navbar;