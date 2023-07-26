import React, { useState, useEffect } from "react";
import { Container, Header, Navbar, Screen } from "@components";
import { TScreenInfo } from "@components/types";
import { getBusinessUrl } from "@core/utils";
import { PaymentStatus } from "@components/paymentstatus";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useLocation } from "react-router-dom";


const AllPaymentStatus: React.FC = () => {
    const [state, setState] = useState < TScreenInfo > ();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)


    useEffect(() => {
        if (queryParams?.includes("success")) {
            setState({ message: "Payment Successfull.", actionText: "View Order", next: "/cart/vieworder", image_url: "https://jhattse.com/public/assets/payment_successful.png", icon: <MdCheckCircle className='text-6xl text-green-500 ' />, order_info: "has been placed" });
        } else if (queryParams?.includes("pending")) {
            setState({ message: "Payment Pending", actionText: "View Order", next: "/cart/vieworder", image_url: "https://jhattse.com/public/assets/payment_successful.png", icon: <MdCancel className='text-6xl text-error-500 ' />, order_info: "could not placed" });
        } else if (queryParams?.includes("cancelled")) {
            setState({ message: "Payment Cancelled", actionText: "Retry", next: "/cart/paymentmethod", image_url: "https://jhattse.com/public/assets/payment_failed.png", icon: <MdCancel className='text-6xl text-error-500 ' />, order_info: "could not placed" });
        } else if (router.query.param?.includes("failed")) {
            setState({ message: "Payment Failed", actionText: "Retry", next: "/cart/paymentmethod", image_url: "https://jhattse.com/public/assets/payment_failed.png", icon: <MdCancel className='text-6xl text-error-500 ' />, order_info: "could not placed" });
        }
    }, [location]);

    return (
        <Container>
            <Header />
            <PaymentStatus actionText={state?.actionText || ""} message={state?.message || ""} next={state?.next || "/"} image_url={state?.image_url || ""} icon={state?.icon} order_info={state?.order_info || ""} />
            <Navbar />
        </Container>
    );
};

export default AllPaymentStatus;
