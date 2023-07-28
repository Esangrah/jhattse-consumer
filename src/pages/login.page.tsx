import React from "react";
import Head from 'react-helmet';
import { Container } from "@components/container";
import { Header } from "@components/header";
import { SignIn } from "@components/authentication/signin";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Page: React.FC = () => {
    return (
        <Container>
            <Head>
                <title>Login - Jhattse</title>
                <meta name="description" content="Login on Jhattse. Jhattse is a local ecommerce platform which provides product visibility, best price discovering and all available deals and offers." />
            </Head>
            <Header />
            <div className="grid grid-flow-col grid-cols-6 place-content-center sm:place-content-start py-4">
                <div className="col-start-3 col-span-2 lg:col-start-2 lg:col-span-4 sm:col-start-1 sm:col-span-6">
                    <GoogleOAuthProvider clientId="624666456033-814o92j1gov9dq125a20b3l2c50r1k6j.apps.googleusercontent.com">
                        <SignIn />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </Container>
    );
};