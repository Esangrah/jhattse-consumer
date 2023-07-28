import { Suspense } from "react";
import { ContextWrapper } from "./Context";
import {
    BrowserRouter as Router,
    useRoutes,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import routes from '~react-pages'
import { Loader } from "@components/spinner";

export const App = () => {
    return (
        <RecoilRoot>
            <ContextWrapper>
                <Suspense fallback={<Loader />}>
                    {useRoutes(routes)}
                </Suspense>
            </ContextWrapper>
        </RecoilRoot>
    );
};

export default App;
