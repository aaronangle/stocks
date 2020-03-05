import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANY_NEWS } from "../../graphql/query";
import styles from "./style.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";
import CompanyNewsCard from "../CompanyNewsCard/CompanyNewsCard";

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
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1224 },
            items: 4,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1224, min: 804 },
            items: 3,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 804, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };
    return (
        <div>
            <h2>Company News</h2>
            <div>
                <Carousel
                    responsive={responsive}
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    renderDotsOutside={false}
                    responsive={responsive}
                    infinite={true}
                    keyBoardControl={true}
                    autoPlay={true}
                    autoPlaySpeed={6000}
                    customTransition="all 2"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {companyNews.map(element => {
                        return <CompanyNewsCard details={element} key={element.id} />
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default CompanyNews;