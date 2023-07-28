import React, { useEffect, useState } from "react";
import { navigate } from 'vite-plugin-ssr/client/router';
import { motion } from "framer-motion";
import { MdPhoneEnabled, MdOutlineHome, MdOutlineQrCodeScanner, MdOutlineLocationOn, MdOutlineAccountCircle} from 'react-icons/md';
import { FaStoreAlt } from 'react-icons/fa';
import QRScanner from "@components/qr";

import { Link } from "@renderer/Link";
import { TStore } from "@components/types";
import { getDistance } from 'geolib';
import { getLocation } from "@core/geolocation";
import { Html5QrcodeError } from "html5-qrcode/esm/core";
import { isLoggedIn } from "@recoil/atoms";
import { useRecoilValue } from "recoil";
import { Sidebar } from "..";

export const Navbar: React.FC = () => {
    const [isQROpen, setQROpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [localDistance, setLocalDistance] = useState<number>();
    const [nearestStore, setNearestStore] = useState<TStore>()
    const isLogin = useRecoilValue(isLoggedIn);
    

    const onNewScanResult = (decodedText: string, decodedResult: any) => {
        // Handle the result here.
        console.log(decodedResult);
        navigate(`${decodedText}`);
        setQROpen(false);
        return;
    }
    const onNewScanError = (errorMessage: string, error: Html5QrcodeError) => {
        console.log(errorMessage);
        return;
    }

    useEffect(() => {
        if (nearestStore?.address !== undefined && nearestStore?.address?.latitude !== null) {
            getLocation().then((userLocation) => {
                let distance = getDistance({ 'latitude': userLocation?.latitude, 'longitude': userLocation?.longitude }, { 'latitude': nearestStore?.address?.latitude, 'longitude': nearestStore?.address?.longitude })
                setIsShown(distance < 1000);
                setLocalDistance(distance);
            })
        }
    }, [nearestStore?.address])

    // useEffect(() => {
    //     const res = getNearestStores(0, 1);
    //     res.then((stores) => { if (stores?.length > 0) { setNearestStore(stores[0]) } })
    // }, [router])

    return (
        <>{
            isShown &&
            <div className="fixed -bottom-40 sm:visible w-full z-30 flex flex-col justify-center">
                <motion.div className="grid justify-items-stretch" drag="y"
                    dragConstraints={{
                        bottom: -40,
                        top: -200
                    }}
                    animate={isOpen ? "open" : "closed"}
                    variants={{
                        open: { x: 0, y: "-100%" },
                        closed: { y: "-20%" },
                    }}
                    transition={{ ease: "easeOut", duration: 1 }}
                    whileTap={{ scale: 0.95 }}>
                    <div className="relative justify-self-center flex justify-center w-20 h-8 -bottom-1 z-10" onClick={() => setIsOpen(!isOpen)}>
                        <div className="absolute bottom-0 justify-self-center bg-sky-700 w-20 h-10 rounded-tl-full rounded-tr-full"></div>
                        <div className="absolute bottom-0 justify-self-center bg-sky-500 w-16 h-8 rounded-tl-full rounded-tr-full"></div>
                        <div className="absolute bottom-0 justify-self-center bg-sky-300 w-12 h-6 rounded-tl-full rounded-tr-full"></div>
                        <div className="absolute bottom-0 justify-self-center bg-sky-100 w-8 h-4 rounded-tl-full rounded-tr-full"></div>
                    </div>
                    <div className="bg-neutral-800 w-full h-40 z-20 rounded-t-2xl">
                        <div className="relative w-full sm:h-40 p-4">
                            <div className="w-full rounded-t-2xl">
                                <div className="grid grid-flow-col grid-cols-6">
                                    <div className="col-span-4">
                                        <h3 className="text-neutral-50 font-bold text-2xl sm:text-xl line-clamp-2">{nearestStore?.name}</h3>
                                    </div>
                                    <div className="col-span-2 justify-self-end">
                                        <p className="text-neutral-50 text-2xl"><MdOutlineQrCodeScanner /></p>
                                    </div>
                                </div>
                                <p className="text-neutral-50">{nearestStore?.category?.name}</p>
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-neutral-50">{nearestStore?.phone}</p>
                                    <p className="text-sky-300 text-lg font-bold"><a href={`tel:${nearestStore?.phone}`}><MdPhoneEnabled /></a></p>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-neutral-50">{nearestStore?.address.street_name}{", "}{nearestStore?.address.city.name}</p>
                                    {(localDistance != undefined) && <p className="text-sky-300 text-base sm:text-sm font-bold whitespace-nowrap">{localDistance < 1000 ? localDistance.toFixed(0).toString() + " m" : (localDistance < 10000 ? (localDistance / 1000).toFixed(1).toString() + " km" : (localDistance > 100 * 1000 ? "VIEW LOCATION" : (localDistance / 1000).toFixed(0).toString() + " km"))}</p>}
                                    <p className="text-sky-300 text-lg font-bold"><a href={`http://www.google.com/maps/place/${nearestStore?.address?.latitude},${nearestStore?.address?.longitude}`} target="_blank"><MdOutlineLocationOn/></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        }
            {
                isQROpen &&
                <div className="fixed -bottom-96 sm:visible w-full z-40 flex flex-col justify-center">
                    <motion.div className="grid justify-items-stretch" drag="y"
                        dragConstraints={{
                            bottom: 0,
                            top: -440
                        }}
                        animate={isQROpen ? "open" : "closed"}
                        variants={{
                            open: { x: 0, y: "-110%" },
                            closed: { y: "0%" },
                        }}
                        transition={{ ease: "easeOut", duration: 1 }}
                        whileTap={{ scale: 0.99 }}>
                        <div className="bg-neutral-700 flex flex-col p-4 gap-2 justify-center items-center w-full h-full z-20 rounded-t-2xl">
                            <p className="text-neutral-50 text-center font-semibold text-2xl">Scanning with <span className="font-super">Jhattse</span></p>
                            <QRScanner
                                fps={6}
                                qrbox={{ width: 320, height: 320 }}
                                aspectRatio={1 / 1}
                                disableFlip={false}
                                verbose={true}
                                qrCodeErrorCallback={onNewScanError}
                                qrCodeSuccessCallback={onNewScanResult}
                            />
                        </div>
                    </motion.div>
                </div>
            }
            <div className="bg-neutral-50 h-10 sm:h-16"></div>
            <div className="z-40 bg-neutral-50 fixed h-16 p-0 flex justify-center bottom-0 left-0 right-0 hidden sm:block">
                <ul className="flex flex-row justify-between grow py-2 px-8">
                    <li className="nav-item text-neutral-900 px-1 flex items-center select-none">
                        <Link href="/" className="flex flex-col items-center">
                            <MdOutlineHome size="1.8em" /><p className="text-[10px]">Home</p>
                        </Link>
                    </li>
                    <li className="nav-item text-neutral-900 px-1 flex items-center select-none">
                        <Link href="/store" className="flex flex-col items-center">
                            <FaStoreAlt size="1.8em" /><p className="text-[10px]">Stores</p>
                        </Link>
                    </li>
                    <li className="nav-item text-neutral-900 px-1 flex items-center select-none">
                        <div onClick={() => setQROpen(!isQROpen)} className="flex flex-col items-center">
                            <MdOutlineQrCodeScanner size="1.8em" /><p className="text-[10px]">QR Scan</p>
                        </div>
                    </li>
                    <li className="nav-item text-neutral-900 px-1 flex items-center select-none">
                        {/* <Link to="/account" className="flex flex-col items-center"> */}
                        <span onClick={() => setIsShowSidebar(!isShowSidebar)} className="flex flex-col items-center">
                            <MdOutlineAccountCircle size="1.8em" /><p className="text-[10px]">Account</p>
                        </span>
                    </li>
                </ul>
            </div>
            {isShowSidebar && <div className="flex flex-col items-center justify-center py-2">
                <Sidebar isShowSidebar={isShowSidebar} />
            </div>}
        </>
    );
};
