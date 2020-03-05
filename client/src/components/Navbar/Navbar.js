import React, { useState } from "react";
import styles from "./style.module.css";
import { ADD_SYMBOL, GET_SYMBOLS } from "../../graphql/query";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { show } = props;
    const [input, setInput] = useState("");
    const [dropDown, setDropDown] = useState(false);
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

    const showDropdown = (e) => {
        e.stopPropagation();
        if (dropDown) {
            setDropDown(false);
        } else {
            setDropDown(true);
        }
    }
    return (
        <div className={styles.navbar} onClick={() => setDropDown(false)} >
            <div className={styles.dropContainer}>
                <div className={styles.titleWrapper}>
                    <Link to={"/"} style={{ textDecoration: 'none' }}>
                        <h1 className={styles.title}>StockTalk</h1>
                    </Link>
                    <div onClick={(e) => showDropdown(e)} className={styles.circle}>
                        <div className={styles.triangle}></div>
                    </div>
                </div>
                {dropDown ?
                    <div className={styles.dropDown}>
                        <Link to={"/news"} style={{ textDecoration: 'none' }}>
                            <h3 className={styles.title}>General News</h3>
                        </Link>
                    </div>
                    : <div style={{ visibility: "hidden" }} className={styles.dropDown} >
                        <Link to={"/news"} style={{ textDecoration: 'none' }}>
                            <h3 className={styles.title}>General News</h3>
                        </Link>
                    </div>}
            </div>
            {show ?
                <div className={styles.search}>
                    <input className={styles.input} placeholder="Add A Stock Symbol" value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <h1 className={styles.add} onClick={addSymbol}>+</h1>
                </div>
                : <div className={styles.search} style={{ visibility: 'hidden' }}>
                    <input className={styles.input} placeholder="Add A Stock Symbol" value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <h1 className={styles.add} onClick={addSymbol}>+</h1>
                </div>}
        </div >
    )
}

export default Navbar;