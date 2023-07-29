import React from "react";
import { Image } from "@renderer/Image";
import { TImage } from "./../types";
import { sanityIoImageLoader } from "@core/utils";

interface Props {
    images: TImage[]
}

export const Carousel: React.FC<Props> = ({ images }: Props) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide relative" data-bs-ride="carousel">
            <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                {images.map((img, index) => (
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-href={`"${index}"`}
                        className="active"
                        aria-current="true"
                        aria-label={`"Slide ${index}"`}
                        key={index}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner relative w-full overflow-hidden">
                {images.map((image, index) => (
                    index == 0 ?
                        <div className="carousel-item active float-left w-full" key={index}>
                            <Image
                                loader={sanityIoImageLoader}
                                src={image.url}
                                className="block w-full rounded-t-xl"
                                alt={image.description}
                                width="200" height="220"
                                loading="eager"
                            />
                        </div> :
                        <div className="carousel-item active float-left w-full" key={index}>
                            <Image
                                loader={sanityIoImageLoader}
                                src={image.url}
                                className="block w-full rounded-t-xl"
                                alt={image.description}
                                width="200" height="220"
                                loading="lazy"
                            />
                        </div>
                ))}
            </div>
            <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}