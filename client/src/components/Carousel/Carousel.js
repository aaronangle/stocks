import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CompanyNewsCard from "../CompanyNewsCard/CompanyNewsCard";

const CarouselSlider = (props) => {
    const { item } = props;
    const responsive = {
        large: {
            breakpoint: { max: 3000, min: 1350 },
            items: 4,
            slidesToSlide: 4, // optional, default to 1.
        },
        medium: {
            breakpoint: { max: 1350, min: 1050 },
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1050, min: 700 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
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
            {item.map(element => {
                return <CompanyNewsCard details={element} key={element.id} />
            })}
        </Carousel>
    )
}

export default CarouselSlider;