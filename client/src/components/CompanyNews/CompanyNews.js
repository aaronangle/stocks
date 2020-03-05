import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANY_NEWS } from "../../graphql/query";
import styles from "./style.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";
import CompanyNewsCard from "../CompanyNewsCard/CompanyNewsCard";
import CarouselSlider from "../Carousel/Carousel";

const CompanyNews = (props) => {
    const { name } = props;
    const { loading, error, data } = useQuery(GET_COMPANY_NEWS, { variables: { name } });
    if (loading) return (
        <div className={styles.loadingContainer}>
            <LoadingSpinner />
        </div>
    )
    if (error) return `Error! ${error.message}`;
    const { companyNews } = data;
    return (
        <div>
            <h2>Company News</h2>
            <CarouselSlider item={companyNews} />
        </div>
    )
}

export default CompanyNews;