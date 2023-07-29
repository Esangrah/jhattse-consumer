import { useEffect, useState } from 'react'
import { Image } from "@renderer/Image";
import { Link } from "@renderer/Link";
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedIn, profileState } from "@recoil/atoms/profile";
import { signout } from "@api/authentication";
import PopupComponent from '@components/popup';
import { sanityIoImageLoader, staticImageLoader } from '@core/utils';
import { MdEdit } from 'react-icons/md';
import { FaChevronRight, FaClipboardList, FaShoppingCart } from "react-icons/fa"
import { MdPersonPinCircle, MdPayments, MdShoppingBag, MdMoreVert, MdNavigateNext, MdLogout } from "react-icons/md"
import { MdSettings } from "react-icons/md"

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
} from '@chakra-ui/react'
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlineClose } from 'react-icons/md';
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from '@renderer/usePageContext';

interface Props {
    homeLink?: string
    isShowSidebar?: boolean

}

export const Sidebar: React.FC<Props> = ({ homeLink, isShowSidebar }) => {
    const [showSidebar, setShowSidebar] = useState(isShowSidebar);
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(isLoggedIn);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<string>("Are You Sure?");
    const profile = useRecoilValue(profileState)
    const pageContext = usePageContext();
    

    const orderId = typeof window !== "undefined" && localStorage.getItem("orderId");

    const signOutCallback = () => {
        signout().then((res) => { setUserLoggedIn(false); localStorage.clear(); navigate("/") })
        setShowModal(false);
        setShowSidebar(false);
    }

    useEffect(() => {
        if ((typeof window !== "undefined" && localStorage.getItem('token') || '').length > 0) {
            setUserLoggedIn(true);
        }
    }, [pageContext.urlOriginal])

    return (
        <div>
            {showSidebar ? (
                <div>
                    <div className={`top-0 left-0 w-72 md:w-1/2 sm:w-full bg-neutral-100 overflow-auto ${showSidebar ? "transition duartion-0" : "transition duartion-0"} text-neutral-50 fixed h-full z-40 ease-in-out`}>
                        <div className="flex items-center bg-neutral-900 justify-between h-14 px-2 gap-2">
                            <div className="flex flex-row flex-grow justify-between items-center justify-items-stretch h-12">
                                <div>
                                    <Link href={homeLink || "/"}>
                                        <Image
                                            loader={staticImageLoader}
                                            src="public/jhattse-logo.svg"
                                            width="100"
                                            height="40"
                                            alt="Jhattse logo"
                                            loading="eager"
                                        />
                                    </Link>
                                </div>
                                <button
                                    className="flex text-2xl text-neutral-50 items-center cursor-pointer z-50 w-8"
                                    onClick={() => setShowSidebar(!showSidebar)}
                                >
                                    <MdOutlineClose strokeWidth="2" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-4">
                            {userLoggedIn ?
                                <>
                                    <div className="grid p-4 bg-neutral-50 rounded-md">
                                        <div className="flex justify-between ">
                                            <div className="flex gap-2 ">
                                                <Image
                                                    loader={sanityIoImageLoader}
                                                    src={profile?.profile_image || "/consumer/circular-logo.png"}
                                                    width="45"
                                                    height="24"
                                                    alt="logo"
                                                    loading="eager"
                                                    className="rounded-full"
                                                />
                                                <div className="grid gap-1 items-center text-neutral-900">
                                                    <p className="text-xl text-neutral-900 font-manrope font-semibold">{profile?.first_name}</p>
                                                    <p className="text-sm text-neutral-900 font-manrope font-medium">+91 {profile?.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-xl items-center text-neutral-900">
                                                <Link href={"/account/profile"}>
                                                    <MdEdit />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                </>
                                :
                                <div className="grid gap-4 grid-cols-2 p-4 bg-neutral-50 rounded-md">
                                    <Link href="/login">
                                        <button className="whitespace-nowrap border border-neutral-900 text-xl text-neutral-900 w-full rounded-md bg-neutral-50 font-semibold p-1 font-semibold">Login</button>
                                    </Link>
                                    <Link href="/signup">
                                        <button className="whitespace-nowrap border border-neutral-900 text-xl text-neutral-50 w-full rounded-md bg-neutral-900 font-semibold p-1 font-semibold">Sign Up</button>
                                    </Link>
                                </div>
                            }
                            {/* <Link href={homeLink || "/"}><div className="text-base font-manrope bg-neutral-50 rounded-md font-semibold text-neutral-900 p-2">Home</div></Link> */}
                            {(orderId !== null && orderId !== undefined) && <Link href={'/cart/vieworder'}>
                                <div className="flex justify-between bg-neutral-50 rounded-md py-3 px-2">
                                    <div className="flex gap-2">
                                        <span className="flex items-center text-xl font-semibold text-neutral-900"><FaClipboardList /></span>
                                        <span className="flex items-center text-base font-semibold text-neutral-900"> Your Recent Order</span>
                                    </div>
                                    <span className="flex items-center text-xl text-neutral-900 font-semibold">
                                        <FaChevronRight />
                                    </span>
                                </div>
                            </Link>}
                            <Link href={'/cart'}>
                                <div className="flex justify-between bg-neutral-50 rounded-md py-3 px-2">
                                    <div className="flex gap-2">
                                        <span className="flex items-center text-xl font-semibold text-neutral-900"><FaShoppingCart /></span>
                                        <span className="flex items-center text-base font-semibold text-neutral-900"> My Cart</span>
                                    </div>
                                    <span className="flex items-center text-xl text-neutral-900 font-semibold">
                                        <MdNavigateNext />
                                    </span>
                                </div>
                            </Link>
                            <Link href={'/order/me'}>
                                <div className="flex justify-between bg-neutral-50 rounded-md py-3 px-2">
                                    <div className="flex gap-2">
                                        <span className="flex items-center text-xl font-semibold text-neutral-900"><MdShoppingBag /></span>
                                        <span className="flex items-center text-base font-semibold text-neutral-900"> My Orders</span>
                                    </div>
                                    <span className="flex items-center text-xl text-neutral-900 font-semibold">
                                        <MdNavigateNext />
                                    </span>
                                </div>
                            </Link>
                            <Link href={'/account/addresses'}>
                                <div className="flex justify-between bg-neutral-50 rounded-md py-3 px-2">
                                    <div className="flex gap-2">
                                        <span className="flex items-center text-xl font-semibold text-neutral-900"><MdPersonPinCircle /></span>
                                        <span className="flex items-center text-base font-semibold text-neutral-900"> My Addresses</span>
                                    </div>
                                    <span className="flex items-center text-xl text-neutral-900 font-semibold">
                                        <MdNavigateNext />
                                    </span>
                                </div>
                            </Link>
                            {/* <Link href={'/account'}><div className="text-base font-manrope bg-neutral-50 rounded-md font-semibold text-neutral-900 p-2">My Account</div></Link> */}
                            <Link href={''}>
                                <div className="flex justify-between bg-neutral-50 rounded-md py-3 px-2">
                                    <div className="flex gap-2">
                                        <span className="flex items-center text-xl font-semibold text-neutral-900"><MdSettings /></span>
                                        <span className="flex items-center text-base font-semibold text-neutral-900">Setting</span>
                                    </div>
                                    <span className="flex items-center text-xl text-neutral-900 font-semibold">
                                        <MdNavigateNext />
                                    </span>
                                </div>
                            </Link>
                            <Link href={'/refer'}>
                                <div className="flex justify-between bg-neutral-50 rounded-md py-3 px-2">
                                    <div className="flex gap-2">
                                        <span className="flex items-center text-xl font-semibold text-neutral-900"><MdPayments /></span>
                                        <span className="flex items-center text-base font-semibold text-neutral-900">Refer and Earn</span>
                                    </div>
                                    <span className="flex items-center text-xl text-neutral-900 font-semibold">
                                        <MdNavigateNext />
                                    </span>
                                </div>
                            </Link>
                            <div>
                                <Accordion allowMultiple>
                                    <AccordionItem>
                                        {({ isExpanded }) => (
                                            <>
                                                <div className={`flex bg-neutral-50 ${isExpanded ? "rounded-t-md" : "rounded-md"} py-3 px-2`}>
                                                    <AccordionButton>
                                                        <Box as="span" flex='1' textAlign='left'>
                                                            <span className="flex gap-2 items-center text-base font-semibold text-neutral-900"><MdMoreVert />More</span>
                                                        </Box>
                                                        {isExpanded ? (
                                                            <span className="flex items-center text-base text-neutral-900 font-semibold">
                                                                <FaMinus />
                                                            </span>

                                                        ) : (
                                                            <span className="flex items-center text-base text-neutral-900 font-semibold">
                                                                <FaPlus />
                                                            </span>

                                                        )}
                                                    </AccordionButton>
                                                </div>
                                                <AccordionPanel pb={4}>
                                                    <div className={`flex p-2 bg-neutral-50 flex-col ${isExpanded ? "rounded-b-md" : ""}`}>
                                                        <Link href={'/about'}><div className="text-base font-semibold text-neutral-900">About Us</div></Link>
                                                        <Link href={'/terms'}><div className="text-base font-semibold text-neutral-900">Terms of Use</div></Link>
                                                        <Link href={'/privacy'}><div className="text-base font-semibold text-neutral-900">Privacy Policy</div></Link>
                                                    </div>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                </Accordion>
                            </div>

                            {userLoggedIn ?
                                <>
                                    <div className="flex gap-2 bg-neutral-50 rounded-md py-3 px-2">
                                        <span className="flex items-center text-xl font-semibold text-error-500"><MdLogout /></span>
                                        <button className="flex justify-start text-error-500 text-base font-manrope font-semibold w-full" onClick={() => setShowModal(!showModal)} >Log Out</button>
                                    </div>
                                </>
                                :
                                <>
                                </>}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )
            }
            <svg
                onClick={() => setShowSidebar(!showSidebar)}
                className="z-30 flex items-center cursor-pointer "
                fill="#FFFFFF"
                viewBox="0 0 100 80"
                width="30"
                height="30"
            >
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
            </svg>

            {/* Confirm Popup */}
            <PopupComponent
                showModal={showModal}
                setShowModal={setShowModal}
                message={message}
                ActionFun={signOutCallback}
            />
        </div >
    )
}


