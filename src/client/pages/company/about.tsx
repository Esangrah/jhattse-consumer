import React from "react";
import { Container } from "@components";
import Footer from "@components/company/footer";
import Navbar from "@components/company/navbar";

// const Header = dynamic(() => import("../../src/components/header").then((mod) => mod.Header), {
//     ssr: false,
// });

const About: React.FC = () => {
    return (
        <Container>
            {/* <Head>
                <title>About Us - Jhattse by Esangrah</title>
                <meta name="description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Jhattse provide its users product discovery and offers" />
                <meta name="og:title" content="About Us - Jhattse by Esangrah" />
                <meta name="og:description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Jhattse provide its users product discovery and offers" />
                <meta name="og:image" content="https://jhattse.com/consumer/square-logo-4x.png" />
                <link rel="canonical" href="https://jhattse.com/about" />
                <link rel="shortcut icon" href="https://jhattse.com/consumer/circular-logo.png" />
            </Head> */}
            <div className="flex justify-center">
                <Navbar />
            </div>
            <div className="main flex flex-col flex-grow justify-between px-20 sm:px-2">
                <div className="flex justify-center items-center p-4">
                    <div className="flex flex-col gap-4 justify-center items-center text-center">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-gray-800 underline decoration-sky-500">About the Company:</h2>
                            <p className="text-gray-800 text-justify font-manrope">
                                <span className="font-semibold text-yellow-600">Esangrah Technologies Pvt Ltd </span> is an organisation incorporated in Jan
                                2023 with a mission of empowering businesses and service providers and helping them thrive in the digital age. We offer 360 degree solutions ranging from online payments, inventory management, billing, customer management, marketplace and delivery solutions to business helping them participate in a fast transforming digital space and at a time of rapidly changing consumer behaviour. We are ready to disrupt retail, logistics and mobility segments in the near future starting today.
                            </p>
                            <p className="text-gray-800 text-justify font-manrope">
                                We think at the time where consumers are adopting and changing their behaviour at a rapid pace, our business cannot be left behind with the traditional approach otherwise they will have everything to lose instead of immensely gaining from these new opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
};
export default About;
