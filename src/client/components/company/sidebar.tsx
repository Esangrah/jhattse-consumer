import { staticImageLoader } from '@core/utils'
import { Image } from '@renderer/Image'
import { Link } from 'react-router-dom'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
    showSidebar?: boolean,
    setShowSidebar?: Function
}

const Sidebar: React.FC<Props> = ({ showSidebar, setShowSidebar }) => {
    return (
        <div className="hidden sm:block">
            {showSidebar ? (
                <div>
                    <div className={`top-0 left-0 w-72 md:w-1/2 sm:w-full bg-gray-100 overflow-auto ${showSidebar ? "transition duartion-0" : "transition duartion-0"} text-white fixed h-full z-40 ease-in-out`}>
                        <div className="flex items-center bg-gray-900 justify-between h-14 px-2 gap-2">
                            <div className="flex flex-row flex-grow justify-between items-center justify-items-stretch h-12">
                                <div>
                                    <Link href={"/company"}>
                                        <Image
                                            loader={staticImageLoader}
                                            src="https://jhattse.com/api/v1/file/?key=esangrah/P1BX9YMA_bottomimage.png"
                                            width="100"
                                            height="40"
                                            alt="Company logo"
                                            loading="eager"
                                        />
                                    </Link>
                                </div>
                                <button
                                    className="flex text-2xl text-white items-center cursor-pointer z-50 w-8"
                                    onClick={() => setShowSidebar(!showSidebar)}
                                >
                                    <AiOutlineClose strokeWidth="2" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col h-full justify-center w-full gap-3 p-4">

                            <Link href={"https://wellfound.com/company/esangrah-technologies-1"}>
                                <div className="text-base font-manrope bg-white rounded-md font-semibold text-black p-2">CAREERS</div>
                            </Link>
                            <Link href={"/"}>
                                <div className="text-base font-manrope bg-white rounded-md font-semibold text-black p-2">CONTACT US</div>
                            </Link>

                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )
            }
        </div >
    )
}

export default Sidebar