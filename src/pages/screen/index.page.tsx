import React, { useState, useEffect } from "react";
import { Container, Header, Navbar, Screen } from "@components";
import { TScreenInfo } from "@components/types";
import { getBusinessUrl } from "@core/utils";
import { usePageContext } from "@renderer/usePageContext";


export const Page: React.FC = () => {
    const [state, setState] = useState < TScreenInfo > ();
    const [userType, setUserType] = useState(null);
    const pageContext = usePageContext();

    useEffect(() => {
        setUserType(JSON.parse(localStorage.getItem("profile"))?.is_business)
    }, [location])

    useEffect(() => {
        if (pageContext.urlPathname?.endsWith("signup")) {
            setState({ message: "Completed Signup Sucessfully.", actionText: "Login Now", next: "/login" });
        } else if (pageContext.urlPathname?.endsWith("login") && pageContext.urlPathname?.endsWith("already")) {
            setState({ message: "You are already logged in. Go to Home and start Exploring", actionText: "Go to Home", next: `${userType == true ? getBusinessUrl("/business") : "/"}` });
        } else if (pageContext.urlPathname?.endsWith("forgot-password")) {
            setState({ message: "A mail has been sent to your mail. Check you mail for further instructions.", actionText: "Go to Home", next: `${userType == true ? getBusinessUrl("/business") : "/"}` });
        } else if (pageContext.urlPathname?.endsWith("reset-successful")) {
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
