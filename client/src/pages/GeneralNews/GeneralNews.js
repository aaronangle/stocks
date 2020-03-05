import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { GET_GENERAL_NEWS } from "../../graphql/query";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./style.module.css";
import CarouselSlider from "../../components/Carousel/Carousel";

const GeneralNews = () => {

    const { loading, error, data } = useQuery(GET_GENERAL_NEWS);
    if (loading) return (
        <div className={styles.loadingContainer}>
            <LoadingSpinner />
        </div>
    )
    if (error) return `Error! ${error.message}`;
    const { generalNews, mergerNews, forexNews, cryptoNews } = data;

    return (
        <div>
            <Navbar show={false} />
            <div className={styles.container}>
                <h2>General News</h2>
                <div>
                    <CarouselSlider item={generalNews} />
                </div>
                <h2>Crypto News</h2>
                <div>
                    <CarouselSlider item={cryptoNews} />
                </div>
                <h2>Forex News</h2>
                <div>
                    <CarouselSlider item={forexNews} />
                </div>
                <h2>Merger News</h2>
                <div>
                    <CarouselSlider item={mergerNews} />
                </div>
            </div>
        </div>
    )
}

export default GeneralNews;