import React from "react";
import { AppProps } from "next/app";
import NextNProgress from 'nextjs-progressbar';
import { RecoilRoot } from "recoil";
import "@styles/tailwind.scss";
import "@styles/global.scss";
import "@styles/navbar.scss";
import "@styles/home.scss";
import { VariantSelector } from "@components/variant/variantSelector";



function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <RecoilRoot>
            <VariantSelector />
            <NextNProgress color="#D8AC0F" options={{ showSpinner: false }} />
            <Component {...pageProps} />
        </RecoilRoot>
    );
}

export default MyApp;
