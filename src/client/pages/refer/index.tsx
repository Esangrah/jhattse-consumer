import Head from 'react-helmet';
import { Image } from "@renderer/image";
import { Link} from "react-router-dom"
import { Container, Header } from "@components";
import ReferAndEarn from "@components/referAndEarn";

const Refer: React.FC = () => {
    return (
        <Container>
            <Head>
                <title>Referral Program - Jhattse by Esangrah</title>
                <meta name="description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Super provide its users product discovery and offers" />
                <meta name="og:title" content="Refer & Earn on Jhattse by Esangrah" />
                <meta name="og:description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Super provide its users product discovery and offers" />
                <meta name="og:image" content="https://jhattse.com/consumer/square-logo-4x.png" />
                <link rel="canonical" href="https://jhattse.com/refer" />
                <link rel="shortcut icon" href="https://jhattse.com/consumer/circular-logo.png" />
            </Head>
            <div className="flex justify-center">
                <Header />
            </div>
            <div className="main pt-2 flex flex-col flex-grow justify-between">
                <ReferAndEarn />
                <div className="text-center text-xs h-1/4 w-full flex flex-col justify-end p-2">@Copyright {new Date().getFullYear()} Esangrah Technologies Pvt Ltd</div>
            </div>
        </Container>
    );
};
export default Refer;
