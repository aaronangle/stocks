import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANYINFO } from "../../graphql/query";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";
import styles from "./style.module.css";
import CompanyNews from "../../components/CompanyNews/CompanyNews";
import moment from "moment";

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
                        <p><span className={styles.lead}>Initial Public Offering:</span> {moment(ipo).format("MMM Do YYYY")}</p>
                        <p><span className={styles.lead}>Stock Exchange:</span> {exchange}</p>
                        <p><span className={styles.lead}>Group:</span> {ggroup}</p>
                        <p><span className={styles.lead}>Industry:</span> {naics}</p>
                        <p><span className={styles.lead}>Total Employees:</span> {employeeTotal}</p>
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