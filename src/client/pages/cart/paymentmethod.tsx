import React, { useEffect, useState } from 'react'
import { Container } from "@components";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { cartState } from '@recoil/atoms';
import { createOrder, retryOrder } from '@api/order';
import { Header } from "@components/header";
import { CartDetails } from '@components/cartinfo/summary';
import { TComponent, TCreateOrder, TIdentity, TOrder } from '@components/types';
import NonLoggedUser from './nonloggeduser';
import { message } from 'antd';
import { getOrders } from "@api/order"
import { useNavigate } from 'react-router-dom';


const paymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [cart, setCart] = useRecoilState(cartState);
    const [userInfo, setUserInfo] = useState<TIdentity>(typeof window !== "undefined" && JSON.parse(localStorage.getItem("profile")));
    const [transactionId, setTransactionId] = useState<TOrder>()
    const tsxnId = typeof window !== 'undefined' ? localStorage.getItem("transaction_id") : null;
    const [orderDetails, setOrderDetails] = useState<TOrder[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (tsxnId != undefined) {
            getOrders([], [], tsxnId).then((result: TOrder[]) => {
                setOrderDetails(result);
                console.log(result)
            })
        }
    }, [tsxnId])

    useEffect(() => {
        if (tsxnId != undefined) {
            setTransactionId({ ...transactionId, transaction_id: tsxnId })
        }
    }, [tsxnId])


    const repeatOrder = () => {
        if (paymentMethod == undefined || paymentMethod == null) {
            message.error("Please select a Payment method")
        }
        retryOrder(transactionId).then((res) => {
            localStorage.setItem("transaction_id", res?.transaction?.id);
            if (typeof window !== "undefined" && typeof window.invokePayment === "function") {
                let tableInfo = JSON.parse(localStorage.getItem("tableInfo"));
                if (paymentMethod == "Cash" && tableInfo != undefined) {
                    navigate("/cart/paymentsuccess")
                    localStorage.removeItem("tableInfo");
                }
                if (paymentMethod == "Cash") {
                    navigate("/cart/payment/success")
                }
                else {
                    window.invokePayment(res);
                }
            }
        })
    }




    const createNewOrder = () => {
        let orderComponents: TComponent[] = [];
        Array.from(cart.values()).map((value) => {
            orderComponents.push(
                {
                    quantity: value?.quantity,
                    inventory_id: value?.inventory?.id,
                    is_delivery: value?.deliverable
                }
            )
        })
        if (orderComponents.length !== 0 && typeof window !== "undefined") {
            let tableInfo = JSON.parse(localStorage.getItem("tableInfo"));
            let address = JSON.parse(localStorage.getItem("Address"));
            let currentOrder: TCreateOrder = {
                components: orderComponents,
                address_id: address !== null && address !== undefined ? address?.id : null,
                payment_mode: paymentMethod,
                currency: "INR",
                user: userInfo,
                info: tableInfo
            }
            if (paymentMethod == undefined || paymentMethod == null) {
                message.error("Please select a Payment method")
            }
            createOrder(currentOrder).then((res) => {
                localStorage.setItem("orderId", res?.transaction?.orders?.length > 0 ? res?.transaction?.orders[0].id : "");
                localStorage.setItem("transaction_id", res?.transaction?.id);
                // navigate('/cart/paymentsuccess');
                if (typeof window !== "undefined" && typeof window.invokePayment === "function") {
                    if (paymentMethod == "Cash" && tableInfo != undefined) {
                        navigate("/cart/paymentsuccess")
                        localStorage.removeItem("tableInfo");
                    }
                    if (paymentMethod == "Cash") {
                        navigate("/cart/payment/success")
                    }
                    else {
                        window.invokePayment(res);
                    }
                }
                setCart((cart) => {
                    cart?.clear();
                    return new Map(cart);
                });
            })
        }

    }

    return (
        userInfo === undefined || userInfo === null ? <NonLoggedUser setUserInfo={setUserInfo} /> :
            <div>
                <Head>
                    <script src=" https://payments.open.money/layer" strategy='beforeInteractive' />
                    <script strategy="afterInteractive">
                        {`window.invokePayment = function invokePayment(res) {
                            Layer.checkout({
                                token: res["meta"]["session"],
                                accesskey: res["meta"]["data"]["key"],
                                theme: {
                                    logo: res["meta"]["data"]["image"],
                                    color: "#3d9080",
                                    error_color: "#ff2b2b"
                                }
                            },
                                function (response) {
                                    if (response.status == "captured") {
                                        response.payment_token_id
                                        response.payment_id
                                        console.log(response)
                                        window.location.href = "/cart/payment/success";
                                        localStorage.setItem("payment_id",response.payment_id)
                                    } 
                                    
                                    else if (response.status == "created") {

                                    } else if (response.status == "pending") {
                                        window.location.href = "/cart/payment/pending";
                                    } else if (response.status == "failed") {
                                        window.location.href = "/cart/payment/failed";
                                    } else if (response.status == "cancelled") {
                                        window.location.href = "/cart/payment/cancelled";
                                    }
                                },
                                function (err) {
                                    //integration errors
                                }
                            );
                        }`}
                    </script>
                </Head>
                <Container>
                    <Header />
                    <div className="px-20 sm:px-2 sm:hidden">
                        <div className="h-4"></div>
                        <Breadcrumb className="font-normal text-lg list-none text-breadcrumbs">
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/cart'>Cart</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem className='font-normal text-ellipsis text-left break-words line-clamp-1' isCurrentPage>
                                <BreadcrumbLink href={`/cart/paymentmethod`}>Select Payment Method</BreadcrumbLink>
                                <ol className="p-0 list-none"></ol>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="h-4"></div>
                    <div><h1 className="font-bold text-lg text-custom_black font-manrope px-20 sm:px-2 sm:text-base">Select Payment Method</h1></div>
                    <div className="h-4"></div>
                    <div className="flex flex-row grow h-full justify-between gap-4 sm:flex-col px-20 sm:px-2">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-col bg-neutral-50  gap-2 p-2 divide-y rounded-lg px-2">
                                <div className="flex flex-col gap-2 py-4">
                                    <div className="flex gap-2 items-center">
                                        <input type="radio" className="cursor-pointer" value='DC' name='paymentmethod' onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="paymentmethod">Credit/Debit</label>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 py-4">
                                    <div className="flex gap-2 items-center">
                                        <input type="radio" className="cursor-pointer" value='UPI' name='paymentmethod' onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="paymentmethod">UPI</label>
                                    </div>

                                    {/* {paymentMethod === "upi" &&
                                        <div className="flex gap-2">
                                            <Input className='bg-neutral-100 rounded p-2 w-1/3 sm:w-full' />
                                            <button className='bg-store_yellow rounded border-yellow-300 p-2 font-bold w-28'>SAVE</button>
                                        </div>
                                    } */}
                                </div>
                                <div className="flex flex-col gap-2 py-4">
                                    <div className="flex gap-2 items-center">
                                        <input type="radio" className="cursor-pointer" value='Cash' name='paymentmethod' onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="paymentmethod">Pay by Cash</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <CartDetails isHidden={false} isShowTaxes={true} btnName="PROCEED TO PAY" actionFun={cart.size > 0 ? createNewOrder : repeatOrder} orderDetails={orderDetails} />
                        {/* {
                            tsxnId !== null ?
                                <button onClick={() => { repeatOrder() }}>Retry</button>
                                :
                                <></>
                        } */}
                    </div>
                </Container>
            </div>
    )
}

export default paymentMethod