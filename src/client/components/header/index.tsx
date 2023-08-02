import React, { Suspense, useEffect, useState } from "react";
import { Searchbar } from "@components/header/searchbar";
import { Image } from "@renderer/Image";
import { Link } from "@renderer/Link";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, isLoggedIn } from "@recoil/atoms";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import Location from "@components/location";
import { staticImageLoader } from "@core/utils";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import {
    MdLogout,
    MdPayments,
    MdPersonPinCircle,
    MdShoppingBag,
    MdSettings,
    MdOutlineLocationOn,
    MdOutlineAccountCircle
} from "react-icons/md";
import { signout } from "@api/authentication";
import { navigate } from 'vite-plugin-ssr/client/router';
import PopupComponent from "@components/popup";
import { FaRegUserCircle } from "react-icons/fa";

interface Props {
    homeLink?: string;
}

export const Header: React.FC<Props> = ({ homeLink }) => {
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(isLoggedIn);
    const cart = useRecoilValue(cartState);
    const [locationPopupShow, setLocationPopupShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<string>("Are You Sure?");
    const signOutCallback = () => {
        signout().then((res) => {
            setUserLoggedIn(false);
            localStorage.clear();
            navigate("/");
        });
        setShowModal(false);
    };

    useEffect(() => {
        if ((typeof window !== "undefined" && localStorage.getItem('token') || '').length > 0) {
            setUserLoggedIn(true);
        }
    }, []);

    return (
        <div className="flex flex-col w-full">
            <div className="navbar w-full bg-neutral-100 flex flex-col sticky lt-sm:relative top-0 z-40 h-16 lt-sm:h-28 px-2 font-manrope">
                {/* Confirm Popup */}
                <PopupComponent
                    showModal={showModal}
                    setShowModal={setShowModal}
                    message={message}
                    ActionFun={signOutCallback}
                />

                <div className="flex flex-row items-center justify-items-stretch h-12">
                    <div className="flex justify-between items-center gap-4 lt-sm:gap-2">
                        <Link href={homeLink || "/"}>
                            <Image
                                priority={"true"}
                                loader={staticImageLoader}
                                src="public/jhattse-logo.svg"
                                width="100"
                                height="40"
                                alt="Jhattse logo"
                                loading="eager"
                            />
                        </Link>
                        <div className="flex gap-1 lt-sm:hidden">
                            <button
                                onClick={() => setLocationPopupShow(true)}
                                className="whitespace-nowrap text-neutral-50 text-4xl font-semibold px-2 font-semibold"
                            >
                                <MdOutlineLocationOn className="text-brand-500" />
                            </button>
                            <div className=" flex lt-sm:flex-row items-center gap-2" onClick={() => setLocationPopupShow(true)}>
                                <p className="text-xs font-medium text-neutral-700">
                                    Deliver to
                                </p>
                                <Suspense>
                                    {typeof window !== "undefined" &&
                                        JSON.parse(localStorage.getItem("location") || '{}')?.Location
                                            ?.name ? (
                                        <span>
                                            <p className="text-sm font-bold text-neutral-700">
                                                {
                                                    JSON.parse(localStorage.getItem("location") || '{}')
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
                                    )
                                    }
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    <div className="m-auto w-2/5 md:w-1/2 visible lt-sm:invisible">
                        <Searchbar />
                    </div>

                    {/* Location Popup */}
                    <Location
                        showModal={locationPopupShow}
                        setShowModal={setLocationPopupShow}
                    />
                    <div className="flex flex-row items-center gap-2 pr-4 lt-sm:pr-2">
                        <div className="lt-sm:hidden">
                            <Suspense>
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
                                                <Link href={"/account/"}>
                                                    <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                        <span>
                                                            <FaUserAlt className="text-base" />
                                                        </span>
                                                        <span> My Profile</span>
                                                    </div>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className="text-neutral-700">
                                                <Link href={"/order/me"}>
                                                    <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                        <span>
                                                            <MdShoppingBag className="text-base" />
                                                        </span>
                                                        <span> My Orders</span>
                                                    </div>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className="text-neutral-700">
                                                <Link href={"/account/addresses"}>
                                                    <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                        <span>
                                                            <MdPersonPinCircle className="text-base" />
                                                        </span>
                                                        <span> My Addresses</span>
                                                    </div>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className="text-neutral-700">
                                                <Link href={""}>
                                                    <div className="flex gap-2 justify-between text-neutral-700 text-base items-center font-semibold p-2">
                                                        <span>
                                                            <MdSettings className="text-base" />
                                                        </span>
                                                        <span> Settings</span>
                                                    </div>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className="text-neutral-700">
                                                <Link href={"/refer"}>
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
                                    <Link href="/login">
                                        <button className="flex items-center gap-2 whitespace-nowrap text-neutral-50 text-lg font-semibold px-2 font-bold">
                                            <FaRegUserCircle className="text-neutral-700" />{" "}
                                            <span className="text-base text-neutral-700">Login</span>
                                        </button>
                                    </Link>
                                )}
                            </Suspense>
                        </div>
                        <div className="flex items-center gap-2 relative py-2">
                            <Suspense>
                                <Link href="/cart" className="z-30">
                                    <button className="flex items-center gap-2 whitespace-nowrap text-neutral-50 text-lg font-semibold px-2 font-bold">
                                        <FaShoppingCart className="text-neutral-700" />{" "}
                                        <span className="text-base lt-sm:hidden text-neutral-700">
                                            Cart
                                        </span>
                                    </button>
                                </Link>
                                <span className={`absolute top-0 -right-2 flex justify-center items-center text-xs text-neutral-50 bg-success-500 rounded-full h-5 w-5${cart?.size > 0 ? "": " hidden"}`}>
                                    {cart.size}
                                </span>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center md:hidden block md:w-1/3 w-full">
                    <Searchbar />
                </div>
            </div>
            <div className="hidden bg-neutral-50 text-custom_black flex gap-2 py-2 lt-sm:flex">
                <div className="flex">
                    <button
                        onClick={() => setLocationPopupShow(true)}
                        className="whitespace-nowrap text-custom_black font-semibold px-2 font-semibold"
                    >
                        <MdOutlineLocationOn />
                    </button>
                    <div className="cursor-pointer" onClick={() => setLocationPopupShow(true)}>
                        <Suspense>
                            <p className="text-xs font-medium text-neutral-700">
                                Deliver to
                            </p>
                            {typeof window !== "undefined" && JSON.parse(localStorage.getItem("location") || '{}')?.Location?.name ?
                                (
                                    <span>
                                        <p className="text-sm font-bold text-custom_black">
                                            {
                                                JSON.parse(localStorage.getItem("location") || '{}')?.Location?.name
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
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};
