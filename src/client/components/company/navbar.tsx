import { sanityIoImageLoader } from '@core/utils'
import { Image } from '@renderer/Image'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import Sidebar from './sidebar'

const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="flex flex-row bg-white justify-between items-center px-16 sm:px-2 h-20 w-full">
            <Link to={"/"} className="w-auto h-14"><Image
                loader={sanityIoImageLoader}
                src={"https://jhattse.com/api/v1/file/?key=esangrah/Z3R2MJ5D_headerimage.png"}
                width="200"
                height="200"
                alt="Company Logo"
                className="w-auto h-14"
            /></Link>
            <div className="w-full flex justify-end items-center gap-4" onClick={() => setShowSidebar(!showSidebar)}>
                <MdMenu size={30} className="hidden sm:block" />
            </div>

            <div className="flex flex-row justify-end items-center w-full gap-8 sm:hidden lg:hidden">
                <Link to={"https://wellfound.com/company/esangrah-technologies-1"}
                    target="_blank"
                    className="text-custom_gray text-xl font-bold lg:hidden sm:hidden">
                    CAREERS
                </Link>
                <Link to={"/"} className="text-custom_gray text-xl font-bold lg:hidden sm:hidden">
                    CONTACT US
                </Link>
            </div>

            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
        </div>
    )
}

export default Navbar