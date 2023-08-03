import React from "react";
import Head from 'react-helmet';
import { Container } from "@components/container";
import { Header } from "@components/header";
import { SignIn } from "@components/authentication/signin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
    return {
        pageContext: {
            pageProps: {},
            documentProps: {
                title: "Login - Jhattse",
                description: "Login on Jhattse. Jhattse is a local ecommerce platform which provides product visibility, best price discovering and all available deals and offers.",
                image: "https://jhattse.com/consumer/square-logo-4x.png",
                keywords: "Local Stores,Local+Online,Online Stores,Shopping Sites,Local Services,Online Shopping,Jhattse",
                canonicalURL: "https://jhattse.com/login",
            }
        },
    };
}

export const Page: React.FC = () => {
    return (
        <Container>
            <Head>
                <title>Login - Jhattse</title>
            </Head>
            <Header />
            <div className="grid grid-flow-col grid-cols-6 place-content-center lt-sm:place-content-start py-4">
                <div className="col-start-3 col-span-2 lg:col-start-2 lg:col-span-4 lt-sm:col-start-1 lt-sm:col-span-6">
                    <GoogleOAuthProvider clientId="624666456033-814o92j1gov9dq125a20b3l2c50r1k6j.apps.googleusercontent.com">
                        <SignIn />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </Container>
    );
};