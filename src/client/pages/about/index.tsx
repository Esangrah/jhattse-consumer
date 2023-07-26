import Head from 'react-helmet';
import React from "react";
import { Container, Header } from "@components";
import { Footer } from "@components/footer";


const About: React.FC = () => {
    return (
        <Container>
            <Head>
                <title>About Us - Jhattse by Esangrah</title>
                <meta name="description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Jhattse provide its users product discovery and offers" />
                <meta name="og:title" content="About Us - Jhattse by Esangrah" />
                <meta name="og:description" content="Jhattse is next-gen billing and customer engagement platform for businesses. Jhattse provide its users product discovery and offers" />
                <meta name="og:image" content="https://jhattse.com/consumer/square-logo-4x.png" />
                <link rel="canonical" href="https://jhattse.com/about" />
                <link rel="shortcut icon" href="https://jhattse.com/consumer/circular-logo.png" />
            </Head>
            <div className="flex justify-center">
                <Header />
            </div>
            <div className="main flex flex-col flex-grow justify-between">
                <div className="flex justify-center items-center p-4">
                    <div className="flex flex-col gap-4 justify-center items-center text-center">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-neutral-800 underline decoration-sky-500">About Us</h2>
                            <p className="text-neutral-800 text-justify font-manrope"><span className="font-semibold text-brand-500">Jhattse</span> is a cutting-edge e-commerce platform that is transforming the way local businesses and service providers offer their products and services. Our platform is designed to help out these businesses and compete with larger market giants by providing them with the tools and support they need to succeed in the digital marketplace.</p>
                            <p className="text-neutral-800 text-justify font-manrope"><span className="font-semibold text-brand-500">Jhattse</span> offers a complete business solution right from the inventory management, ordering, digital product listing via marketplace and online/offline services and customer management.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-neutral-800 underline decoration-sky-500">Who are we?</h3>
                            <p className="text-neutral-800 text-justify font-manrope">We are a tech first solution provider who have an extensive  experience in building advanced digital infrastructure, feature rich and affordable applications for the wide range of customers.</p>
                            <p className="text-neutral-800 text-justify font-manrope">We at Esangrah Technologies are on a mission to provide the right tools to online and offline entrepreneurs and businesses.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-neutral-800 underline decoration-sky-500">FAQ</h3>
                            <div>
                                <p className="font-semibold text-lg text-neutral-800 text-justify font-manrope">What is <span className="font-semibold text-brand-500">Jhattse</span>?</p>
                                <p className="text-neutral-800 text-left font-manrope"><span className="font-semibold text-brand-500">Jhattse</span> is a marketplace offering grocery, FMCG and daily use products. You can find out your favourite stores, restaurants and other services around you. With <span className="font-semibold text-brand-500">Jhattse</span> <span className="text-sky-500 font-semibold">order</span>, <span className="text-sky-500 font-semibold">pay</span> and get products <span className="text-sky-500 font-semibold">delivered</span> to your place.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-neutral-800 text-justify font-manrope">How to setup my store on <span className="font-semibold text-brand-500">Jhattse</span>?</p>
                                <p className="text-neutral-800 text-left font-manrope">To setup your store on <span className="font-semibold text-brand-500">Jhattse</span> you need to create an account via signup screen. After logging/signing in the app, go to the account section and click on <button className="bg-black p-1 sm:text-sm text-neutral-50 font-semibold whitespace-nowrap select-none rounded-md">Add Store</button>. Provide information of the store like Store name, address, category and GST(optional) and add payment methods like upi id and bank accounts for getting pre payments.</p>
                                <p className="text-neutral-800 text-left font-manrope">After verification check via <span className="font-semibold text-brand-500">Jhattse</span> representative your store will be listed on <span className="font-semibold text-brand-500">Jhattse</span> marketplace.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-neutral-800 text-justify font-manrope">What <span className="font-semibold text-brand-500">Jhattse</span> offer to businesses?</p>
                                <p className="text-neutral-800 text-left font-manrope"><span className="font-semibold text-brand-500">Jhattse</span> offers a big marketplace to stores and business for selling their products and services. We offer <span className="bg-success-500 hover:bg-success-900 focus:bg-success-900 p-0.5 sm:text-sm text-neutral-50 font-semibold whitespace-nowrap select-none rounded-md">billing</span> softwares, <span className="bg-success-500 hover:bg-success-900 focus:bg-success-900 p-0.5 sm:text-sm text-neutral-50 font-semibold whitespace-nowrap select-none rounded-md">inventory management</span>, in-built <span className="bg-success-500 hover:bg-success-900 focus:bg-success-900 p-0.5 sm:text-sm text-neutral-50 font-semibold whitespace-nowrap select-none rounded-md">payment gateway</span>, ordering and <span className="bg-success-500 hover:bg-success-900 focus:bg-success-900 p-0.5 sm:text-sm text-neutral-50 font-semibold whitespace-nowrap select-none rounded-md">order management</span> features to businesses.</p>
                                <p className="text-neutral-800 text-left font-manrope">After verification check via <span className="font-semibold text-brand-500">Jhattse</span> representative your store will be listed on <span className="font-semibold text-brand-500">Jhattse</span> marketplace.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-neutral-800 text-justify font-manrope">How to use <span className="font-semibold text-brand-500">Jhattse</span>?</p>
                                <p className="text-neutral-800 text-left font-manrope">To use <span className="font-semibold text-brand-500">Jhattse</span> signup via creating an account or via gmail. After logging in browse through products or stores and add products to your cart/bag. Go to card and select payment mode and delivery/pickup mode. After making an optional pre-payment</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-neutral-800 text-justify font-manrope">How to sell on <span className="font-semibold text-brand-500">Jhattse</span>?</p>
                                <p className="text-neutral-800 text-left font-manrope">Fist setup store on <span className="font-semibold text-brand-500">Jhattse</span>. After adding store on <span className="font-semibold text-brand-500">Jhattse</span> start adding inventory on <span className="font-semibold text-brand-500">Jhattse</span> business portal/app. After adding inventory they will start showing up in the <span className="font-semibold text-brand-500">Jhattse</span> marketplace and on the business portal.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-neutral-800 text-justify font-manrope">How to order products on <span className="font-semibold text-brand-500">Jhattse</span>?</p>
                                <p className="text-neutral-800 text-left font-manrope">Login in <span className="font-semibold text-brand-500">Jhattse</span> app/portal add products to your bag/cart via <button className="bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 p-1 sm:text-sm text-neutral-50 font-semibold whitespace-nowrap select-none rounded-md">ADD TO BAG</button> button</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-neutral-800 text-justify font-manrope">Can I get order delivered from <span className="font-semibold text-brand-500">Jhattse</span>?</p>
                                <p className="text-neutral-800 text-left font-manrope">Most of the stores and service providers provides free local delivery on <span className="font-semibold text-brand-500">Jhattse</span> check for <button className="bg-sky-400 text-neutral-50 text-sm font-semibold p-1 hover:bg-sky-500 focus:bg-sky-500 whitespace-nowrap" >Delivery</button> label while ordering.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
};
export default About;
