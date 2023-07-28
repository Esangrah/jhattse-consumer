import { sanityIoImageLoader } from '@core/utils'
import { Image } from '@renderer/Image'
import React from 'react'

const Footer = () => {
    return (
        <div className="flex flex-row justify-between items-center sm:items-start p-10 sm:px-5 sm:py-5 bg-black sm:flex-col">
            <Image
                loader={sanityIoImageLoader}
                src={"https://jhattse.com/api/v1/file/?key=esangrah/P1BX9YMA_bottomimage.png"}
                width="200"
                height="200"
                alt="Company Logo"
                className="h-auto sm:w-32"
            />
            <div className="flex flex-row pt-10 sm:flex-col">
                <div className="justify-center items-center pr-20">
                    <p className="text-white text-xl pb-10 font-medium">USEFUL LINKS</p>
                    <p className="text-white text-lg font-medium">About Us</p>
                    <p className="text-white text-lg font-medium">Terms of Use</p>
                    <p className="text-white text-lg font-medium">Privacy Policy</p>
                </div>
                <div className="justify-center items-center">
                    <p className="text-white text-xl font-bold mb-10 sm:pt-10">
                        GET IN TOUCH
                    </p>
                    <p className="text-white text-lg font-medium">
                        contact@esangrah.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer