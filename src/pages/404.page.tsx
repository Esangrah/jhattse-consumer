import React, { useEffect, useState } from "react";
import { Container } from "@components/container";
import { Header } from "@components/header";
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from "@renderer/usePageContext";


export const Page: React.FC = () => {
    const [text, setText] = useState("Go Back");
     
    const pageContext = usePageContext()
    

    useEffect(() => {
        setText((window.history.state && window.history.state.idx > 0) ? "Go Back" : "Go Home");
    }, [pageContext.urlOriginal])

    const handleAction = () => {
        if (window.history.state && window.history.state.idx > 0) {
            history.back();
        } else {
            navigate("/");
        }
    }

    return (
        <Container>
            <Header />
            <div className="flex flex-col justify-center h-60 p-4">
                <div className="flex flex-row justify-center items-center gap-2">
                    <span className="text-neutral-900 text-xl font-semibold">404 |</span> This page doesn't exists. <span className="text-xl text-sky-500 font-semibold select-none" onClick={() => { handleAction(); }}>{text}</span>
                </div>
            </div>
        </Container>
    );
};