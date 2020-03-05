import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANYINFO } from "../../graphql/query";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";
import styles from "./style.module.css";
import CompanyNews from "../../components/CompanyNews/CompanyNews";

const CompanyInformation = (props) => {
    const companyName = props.match.params.name;
    const { loading, error, data } = useQuery(GET_COMPANYINFO, { variables: { name: companyName } });

    if (loading) return (
        <div className={styles.loadingContainer}>
            <LoadingSpinner />
        </div>
    )
    if (error) return `Error! ${error.message}`;
    const { address, city, country, description, exchange, ggroup, ipo, naics, name, state, weburl, employeeTotal } = data.companyInformation;

    return (
        <div>
            <Navbar show={false} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>{name.toUpperCase()}</h1>
                    <h4 className={styles.h4}>{address} {city}, {state} {country}</h4>
                </div>
                <div className={styles.information}>
                    <div className={styles.stockInfo}>
                        <p>IPO: {ipo}</p>
                        <p>Exchange: {exchange}</p>
                        <p>Group: {ggroup}</p>
                        <p>Industry: {naics}</p>
                        <p>Total Employees: {employeeTotal}</p>
                    </div>
                    <div className={styles.compInfo}>
                        <p>{description}</p>
                        <a href={weburl}>
                            <button href={weburl} className={styles.button}> Company Site</button>
                        </a>
                    </div>
                </div>
                <CompanyNews name={companyName} />
            </div>
        </div>
    )
}

export default CompanyInformation;