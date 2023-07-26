import React from "react";
import { Swiper } from "swiper/react";

// import Swiper styles
import "swiper/css";


interface Props {
    children: any
    direction?: 'horizontal' | 'vertical';
}


export const CarouselContainer: React.FC<Props> = ({ children, direction }) => {
    return <>
        <Swiper
            direction={direction || 'horizontal'}
            spaceBetween={20}
            slidesPerView={"auto"}
            className="mySwiper"
        >
            {children}
        </Swiper></>
};
