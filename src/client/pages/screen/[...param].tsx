import React, { useState, useEffect } from "react";
import { Container, Header, Navbar, Screen } from "@components";
import { TScreenInfo } from "@components/types";
import { useLocation } from "react-router-dom";
import { getBusinessUrl } from "@core/utils";


const Home: React.FC = () => {
    const [state, setState] = useState < TScreenInfo > ();
    const [userType, setUserType] = useState(null);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    console.log("QueryParams", queryParams);

    useEffect(() => {
        setUserType(JSON.parse(localStorage.getItem("profile"))?.is_business)
    }, [location])

    useEffect(() => {
        if (queryParams?.includes("signup")) {
            setState({ message: "Completed Signup Sucessfully.", actionText: "Login Now", next: "/login" });
        } else if (queryParams?.includes("login") && queryParams?.includes("already")) {
            setState({ message: "You are already logged in. Go to Home and start Exploring", actionText: "Go to Home", next: `${userType == true ? getBusinessUrl("/business") : "/"}` });
        } else if (queryParams?.includes("forgot-password")) {
            setState({ message: "A mail has been sent to your mail. Check you mail for further instructions.", actionText: "Go to Home", next: `${userType == true ? getBusinessUrl("/business") : "/"}` });
        } else if (queryParams?.includes("reset-successful")) {
            setState({ message: "Password reset. Loging with your new password", actionText: "Go to Login", next: "/login" });
        }
    }, [location]);

    return (
        <Container>
            <Header />
            <Screen actionText={state?.actionText || ""} message={state?.message || ""} next={state?.next || "/"} />
            <Navbar />
        </Container>
    );
};

export default Home;
