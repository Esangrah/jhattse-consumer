import { Link } from "react-router-dom"
import { Header } from "@components"
import { FaBox } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
import { IoMdNotificationsOutline } from "react-icons/io"
import { AiOutlineUser } from "react-icons/ai"
import { useEffect, useState } from "react"
import { TIdentity, TOrder } from "@components/types"
import { useRecoilValue } from "recoil"
import { isLoggedIn } from "@recoil/atoms"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import AddressPanel from "@components/address"
import { getOrders } from "@api/order"
import { OrderStatus } from "@components/contants"
import { requestLogin } from "@core/utils"
import { OrderSummaryContainer } from "@components/container"
import ReferAndEarn from "@components/referAndEarn"
import { useNavigate, useLocation } from "react-router-dom"

const Account = () => {
    const [profile, setProfile] = useState<TIdentity>();
    const isLogin = useRecoilValue(isLoggedIn)
    const [currentorders, setCurrentOrders] = useState<TOrder[]>();
    const [pastorders, setPastOrders] = useState<TOrder[]>();
    const [active, setActive] = useState("myorders");
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isLogin) {
            navigate("/");
        } else {
            setProfile(JSON.parse(localStorage.getItem("profile")))
        }
    }, [])

    useEffect(() => {
        const res: Promise<TOrder[]> = getOrders([OrderStatus.CREATED, OrderStatus.PROCESSING]);
        res.then((result) => setCurrentOrders(result)).catch((e) => {
            if (e.response?.status === 401) {
                requestLogin(location.pathname);
            }
        })
    }, [])

    useEffect(() => {
        const res: Promise<TOrder[]> = getOrders([OrderStatus.COMPLETED, OrderStatus.CANCELLED]);
        res.then((result) => setPastOrders(result)).catch((e) => {
            if (e.response?.status === 401) {
                requestLogin(location.pathname);
            }
        })
    }, [])

    return (
        <div>
            <Header />
            <div className="px-20 sm:px-0 font-manrope">
                <div className="hidden sm:block">
                    <div className="bg-brand-500 p-2">
                        <p className="font-bold text-xl text-neutral-50">Hey! {profile?.full_name}</p>
                    </div>
                    <div className="h-4"></div>
                    <div className="bg-neutral-50 grid gap-4 p-4">
                        <div><p className="font-bold text-xl text-neutral-900">Orders</p></div>
                        <Link to={'/order/me'}><div className="flex flex-flow-row gap-2 items-center"><span><FaBox /></span><p className="font-base text-md text-neutral-900">My Orders</p></div></Link>
                    </div>
                    <div className="h-4"></div>
                    <div className="grid gap-4 bg-neutral-50 p-4">
                        <div><p className="font-bold text-xl text-neutral-900">Account Settings</p></div>
                        <Link to={'./account/profile'}><div className="flex flex-flow-row gap-2 items-center"><span><AiOutlineUser /></span><span>Edit Profile</span></div></Link>
                        <Link to={'./account/addresses'}><div className="flex flex-flow-row gap-2 items-center"><span><GoLocation /></span><span>Saved Addresses</span></div></Link>
                        <Link to={''}><div className="flex flex-flow-row gap-2 items-center"><span><IoMdNotificationsOutline /></span><span>Notification Settings</span></div></Link>
                    </div>
                </div>
                {/* For Desktop */}
                <div className="sm:hidden h-20 flex items-center text-sm text-manrope">
                    <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem className='font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                            <BreadcrumbLink href='/account'>My Account</BreadcrumbLink>
                            <ol className="p-0 list-none"></ol>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="sm:hidden">
                    <div className="bg-neutral-50 p-4 flex justify-between items-center rounded-md">
                        <div className="flex flex-col gap-1">
                            <h2 className="font-bold text-xl text-custom_black">{profile?.full_name}</h2>
                            <p className="text-base font-semibold text-custom_gray">{profile?.phone}</p>
                        </div>
                        <a href="/account/profile" className="bg-store_yellow hover:opacity-80 focus:opacity-80 p-2 sm:text-sm text-center text-neutral-900 font-bold whitespace-nowrap select-none rounded">EDIT PROFILE</a>
                    </div>
                    <div className="h-6"></div>
                    <div className="grid grid-cols-3 gap-8 divide-x">
                        <div className="flex flex-col gap-2">
                            <span onClick={() => setActive("myorders")} className={`p-2 bg-neutral-50 text-neutral-900 border-1 border-gray-400 rounded-sm cursor-pointer ${active === "myorders" ? "border-r-8 border-golden rounded-r" : ""}`}>
                                <p className={active === "myorders" ? "text-golden font-bold" : "text-custom_gray font-medium"}>My Orders</p>
                            </span>
                            <span onClick={() => setActive("myaddresses")} className={`p-2 bg-neutral-50 text-neutral-900 border-1 border-gray-400 rounded-sm cursor-pointer ${active === "myaddresses" ? "border-r-8 border-golden rounded-r" : ""}`}>
                                <p className={active === "myaddresses" ? "text-golden font-bold" : "text-custom_gray font-medium"}>My Addresses</p>
                            </span>
                            <span onClick={() => setActive("settings")} className={`p-2 bg-neutral-50 text-neutral-900 border-1 border-gray-400 rounded-sm cursor-pointer ${active === "settings" ? "border-r-8 border-golden rounded-r" : ""}`}>
                                <p className={active === "settings" ? "text-golden font-bold" : "text-custom_gray font-medium"}>Settings</p>
                            </span>
                            <span
                                onClick={() => setActive("referAndEarn")}
                                className={`p-2 bg-neutral-50 text-neutral-900 border-1 border-gray-400 rounded-sm cursor-pointer ${active === "referAndEarn" ? "border-r-8 border-golden rounded-r" : ""}`}>
                                <p className={active === "referAndEarn" ? "text-golden font-bold" : "text-custom_gray font-medium"}>Refer and Earn</p>
                            </span>
                        </div>
                        <div className="col-span-2 pl-6">
                            {active === "myaddresses" && <AddressPanel customStyle="grid grid-cols-2 sm:grid-cols-1 gap-4 rounded-xl" isDone={() => { }} heading="My Addresses" />}

                            {active === "myorders" && <div className="grid gap-6 py-2 px-2 sm:px-0">
                                {currentorders?.length == 0 && pastorders?.length == 0 ?
                                    <div className="flex justify-center animate-pulse duration-1000 p-3 h-full  w-full sm:w-full">
                                        <div>
                                            <FaBox
                                                className="h-52 w-full font-normal"
                                            />
                                            <div>
                                                <h3 className="flex justify-center text-2xl">No orders right now. Start shopping</h3>
                                                {/* <p className="flex justify-center text-2xl text-neutral-900">Looks like you have not added anything to your cart.</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        {currentorders?.length == 0 ?
                                            <></>
                                            :
                                            <div className="w-full">
                                                <h2 className="text-xl font-bold text-custom_black pb-4">Current Orders</h2>
                                                <OrderSummaryContainer orders={currentorders} />
                                            </div>
                                        }
                                        {pastorders?.length == 0 ?
                                            <></>
                                            :
                                            <div className="w-full">
                                                <h2 className="text-xl font-bold text-custom_black py-4">Past Orders</h2>
                                                <OrderSummaryContainer orders={pastorders} />
                                            </div>
                                        }
                                    </div>
                                }
                            </div>}
                            {active === "referAndEarn" && <div className="rounded-lg p-2 bg-emerald-200">
                                <ReferAndEarn />
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account;