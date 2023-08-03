import React, { useState, useEffect } from "react";
import { Header } from "@components/header"
import { Container } from "@components/container";
import { Navbar } from "@components/navbar";
import { TScreenInfo } from "@components/types";
import { PaymentStatus } from "@components/paymentstatus";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { usePageContext } from "@renderer/usePageContext";
import { cartState } from "@recoil/atoms";
import { useRecoilState } from "recoil";


export const Page: React.FC = () => {
    const [state, setState] = useState < TScreenInfo > ();
    const pageContext = usePageContext()
    const [cart, setCart] = useRecoilState(cartState);


    useEffect(() => {
        if (pageContext.urlPathname?.endsWith("success")) {
            setState({ message: "Payment Successful.", actionText: "View Order", next: "/cart/vieworder", image_url: "https://jhattse.com/public/assets/payment_successful.png", icon: <MdCheckCircle size={50} className='text-6xl text-green-500 ' />, order_info: "has been placed" });
            setCart((cart) => {
                cart?.clear();
                return new Map(cart);
            });
        } else if (pageContext.urlPathname?.endsWith("pending")) {
            setState({ message: "Payment Pending", actionText: "View Order", next: "/cart/vieworder", image_url: "https://jhattse.com/public/assets/payment_successful.png", icon: <MdCancel size={50} className='text-6xl text-error-500 ' />, order_info: "could not placed" });
        } else if (pageContext.urlPathname?.endsWith("cancelled")) {
            setState({ message: "Payment Cancelled", actionText: "Retry", next: "/cart/paymentmethod", image_url: "https://jhattse.com/public/assets/payment_failed.png", icon: <MdCancel size={50} className='text-6xl text-error-500 ' />, order_info: "could not placed" });
        } else if (pageContext.urlPathname?.endsWith("failed")) {
            setState({ message: "Payment Failed", actionText: "Retry", next: "/cart/paymentmethod", image_url: "https://jhattse.com/public/assets/payment_failed.png", icon: <MdCancel size={50} className='text-6xl text-error-500 ' />, order_info: "could not placed" });
        }
    }, [pageContext.urlPathname]);

    return (
        <Container>
            <Header />
            <PaymentStatus actionText={state?.actionText || ""} message={state?.message || ""} next={state?.next || "/"} image_url={state?.image_url || ""} icon={state?.icon} order_info={state?.order_info || ""} />
            <Navbar />
        </Container>
    );
};


