import { Suspense } from "react";
import Main from "./pages/Main";
import { ContextWrapper } from "./Context";
import {
    BrowserRouter as Router,
    useRoutes,
  } from 'react-router-dom';
  import { RecoilRoot} from 'recoil';
  import routes from '~react-pages'

export const App = () => {
  return (
    <RecoilRoot>
        <ContextWrapper>
        <Suspense fallback={<p>Loading...</p>}>
            {useRoutes(routes)}
            </Suspense>
        </ContextWrapper>
    </RecoilRoot>
  );
};

export default App;
