import React, { useEffect, useState } from "react";
import { Searchbar } from "@components";
import { Image } from "@renderer/Image";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, isLoggedIn } from "@recoil/atoms";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import Location from "@components/location";
import { sanityIoImageLoader, staticImageLoader } from "@core/utils";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import { AiTwotoneSetting } from "react-icons/ai";

import {
    MdLogout,
    MdPayments,
    MdPersonPinCircle,
    MdShoppingBag,
} from "react-icons/md";
import { signout } from "@api/authentication";
import { useLocation, useNavigate } from "react-router-dom";
import PopupComponent from "@components/popup";
import { createClient, Provider } from "urql";
import { HiOutlineLocationMarker, HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineLocationOn, MdOutlineAccountCircle } from "react-icons/md";

interface Props {
    homeLink?: string;
}

export const Header: React.FC<Props> = ({ homeLink }) => {
    const client = createClient({
        url: "https://business.jhattse.com/graphql",
        exchanges: [],
    });
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(isLoggedIn);
    const cart = useRecoilValue(cartState);
    const [locationPopupShow, setLocationPopupShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<string>("Are You Sure?");
    const navigate = useNavigate()
    const location = useLocation()
    const signOutCallback = () => {
        signout().then((res) => {
            setUserLoggedIn(false);
            localStorage.clear();
            navigate("/");
        });
        setShowModal(false);
    };

    useEffect(() => {
        setUserLoggedIn(localStorage.getItem("token")?.length > 0);
    }, [location]);

    return (
        <div className="flex flex-col w-full">
            <div className="navbar w-full bg-neutral-100 flex flex-col sticky sm:relative top-0 z-40 h-16 sm:h-28 px-2 font-manrope">
                {/* Confirm Popup */}
                <PopupComponent
                    showModal={showModal}
                    setShowModal={setShowModal}
                    message={message}
                    ActionFun={signOutCallback}
                />

                <div className="flex flex-row items-center justify-items-stretch h-12">
                    <div className="flex justify-between items-center gap-4 sm:gap-2">
                        <Link to={homeLink || "/"}>
                            <Image
                                priority={true}
                                loader={staticImageLoader}
                                src="public/jhattse-logo.svg"
                                width="100"
                                height="40"
                                alt="Jhattse logo"
                                loading="eager"
                            />
                        </Link>
                        <div className="flex gap-1 sm:hidden">
                            <button
                                onClick={() => setLocationPopupShow(true)}
                                className="whitespace-nowrap text-neutral-50 text-4xl font-semibold px-2 font-semibold"
                            >
                                <HiOutlineLocationMarker className="text-brand-500" />
                            </button>
                            {typeof window !== "undefined" && (
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setLocationPopupShow(true)}
                                >
                                    <p className="text-xs font-medium text-neutral-700">
                                        Deliver to
                                    </p>
                                    {JSON.parse(localStorage.getItem("location"))?.Location
                                        ?.name ? (
                                        <span>
                                            <p className="text-sm font-bold text-neutral-700">
                                                {
                                                    JSON.parse(localStorage.getItem("location"))
                                                        ?.Location?.name
                                                }
                                            </p>
                                        </span>
                                    ) : (
                                        <span>
                                            <p className="text-sm font-bold text-neutral-700">
                                                Location Name
                                            </p>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="m-auto w-2/5 md:w-1/2 visible sm:invisible">
                        <Searchbar />
                    </div>

                    {/* Location Popup */}
                    <Location
                        showModal={locationPopupShow}
                        setShowModal={setLocationPopupShow}
                    />
                    <div className="flex flex-row items-center gap-2 pr-4 sm:pr-2">
                        <div className="sm:hidden">
                            {userLoggedIn ? (
                                <Menu>
                                    <MenuButton
                                        className="flex gap-1 items-center whitespace-nowrap text-neutral-700 text-lg font-semibold px-2 font-bold"
                                        as={Button}
                                    >
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineAccountCircle size={30} className="text-neutral-700 pr-1" />{" "}
                                            <span className="text-base">My Account</span>
                                        </div>
                                    </MenuButton>
                                    <MenuList className="bg-neutral-50 py-2 px-4 rounded">
                                        <MenuItem className="text-neutral-700">
                                            <Link to={"/account/"}>
                                                <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                    <span>
                                                        <FaUserAlt className="text-base" />
                                                    </span>
                                                    <span> My Profile</span>
                                                </div>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className="text-neutral-700">
                                            <Link to={"/order/me"}>
                                                <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                    <span>
                                                        <MdShoppingBag className="text-base" />
                                                    </span>
                                                    <span> My Orders</span>
                                                </div>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className="text-neutral-700">
                                            <Link to={"/account/addresses"}>
                                                <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                    <span>
                                                        <MdPersonPinCircle className="text-base" />
                                                    </span>
                                                    <span> My Addresses</span>
                                                </div>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className="text-neutral-700">
                                            <Link to={""}>
                                                <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                    <span>
                                                        <AiTwotoneSetting className="text-base" />
                                                    </span>
                                                    <span> Settings</span>
                                                </div>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className="text-neutral-700">
                                            <Link to={"/refer"}>
                                                <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                    <span>
                                                        <MdPayments className="text-base" />
                                                    </span>
                                                    <span> Refer and Earn</span>
                                                </div>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className="text-neutral-700" onClick={() => setShowModal(!showModal)} >
                                            <>
                                                <span
                                                    className="flex gap-2 justify-between text-error-300 text-base items-center font-semibold p-2"
                                                >
                                                    <MdLogout className="text-base" />
                                                </span>
                                                <span> Log Out</span>
                                            </>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            ) : (
                                <Link to="/login">
                                    <button className="flex items-center gap-2 whitespace-nowrap text-neutral-50 text-lg font-semibold px-2 font-bold">
                                        <HiOutlineUserCircle className="text-neutral-700" />{" "}
                                        <span className="text-base text-neutral-700">Login</span>
                                    </button>
                                </Link>
                            )}
                        </div>
                        <div className="flex items-center gap-2 relative py-2">
                            <>
                                <Link to="/cart" className="z-30">
                                    <button className="flex items-center gap-2 whitespace-nowrap text-neutral-50 text-lg font-semibold px-2 font-bold">
                                        <FaShoppingCart className="text-neutral-700" />{" "}
                                        <span className="text-base sm:hidden text-neutral-700">
                                            Cart
                                        </span>
                                    </button>
                                </Link>
                                {cart?.size > 0 && (
                                    <span className="absolute top-0 -right-2 flex justify-center items-center text-xs text-neutral-50 bg-success-500 rounded-full h-5 w-5">
                                        {cart.size}
                                    </span>
                                )}
                            </>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center hidden sm:block w-1/3 sm:w-full">
                    <Searchbar />
                </div>
            </div>
            <div className="hidden bg-neutral-50 text-custom_black flex gap-2 py-2 sm:flex">
                <div className="flex">
                    <button
                        onClick={() => setLocationPopupShow(true)}
                        className="whitespace-nowrap text-custom_black font-semibold px-2 font-semibold"
                    >
                        <MdOutlineLocationOn/>
                    </button>
                    {typeof window !== "undefined" && (
                        <div
                            className="cursor-pointer"
                            onClick={() => setLocationPopupShow(true)}
                        >
                            <p className="text-sm font-medium text-neutral-700 flex gap-2">
                                Deliver to{" "}
                                {JSON.parse(localStorage.getItem("location"))?.Location
                                    ?.name ? (
                                    <span>
                                        <p className="text-sm font-bold text-custom_black">
                                            {
                                                JSON.parse(localStorage.getItem("location"))?.Location
                                                    ?.name
                                            }
                                        </p>
                                    </span>
                                ) : (
                                    <span>
                                        <p className="text-sm font-bold text-brand-500">
                                            SET LOCATION
                                        </p>
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
