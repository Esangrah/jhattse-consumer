import React, { useState, useEffect } from 'react'
import { Container, Header } from "@components";
import { SignUp as SignUpForm } from "@components/authentication/signup";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from '@recoil/atoms';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Footer } from '@components/footer';
import Head from 'react-helmet';
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from '@renderer/usePageContext';

export const Page: React.FC = () => {
    const isLogin = useRecoilValue(isLoggedIn);
    const [type, setType] = useState("user");
    const pageContext = usePageContext();

    useEffect(() => {
        if (isLogin) {
            navigate("/screen/already/login");
        }
    }, [pageContext.urlOriginal])

    return (
        <Container>
            <Head>
                <title>Signup - Jhattse</title>
                <meta name="description" content="Signup on Jhattse. Jhattse is a local ecommerce platform which provides product visibility, best price discovering and all available deals and offers." />
            </Head>
            <Header />
            <div className="grid grid-flow-col grid-cols-6 place-content-center sm:place-content-start py-4">
                <div className="col-start-3 col-span-2 lg:col-start-2 lg:col-span-4 sm:col-start-1 sm:col-span-6">
                    <GoogleOAuthProvider clientId="624666456033-814o92j1gov9dq125a20b3l2c50r1k6j.apps.googleusercontent.com">
                        <SignUpForm type={type} />
                    </GoogleOAuthProvider>
                </div>
            </div>
            <Footer />
        </Container>
    )
}