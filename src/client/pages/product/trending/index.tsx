import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'react-helmet'
import { Footer } from '@components/footer'

const TrendingProducts = dynamic(() => import("src/components/trending").then((mod) => mod.TrendingProducts), {
    ssr: false,
})

const Header = dynamic(() => import("src/components/header").then((mod) => mod.Header), {
    ssr: false,
})

const Navbar = dynamic(() => import("src/components/navbar").then((mod) => mod.Navbar), {
    ssr: false,
})

const Trending = () => {
    return (
        <div>
            <Head>
                <title>Trending Products - Jhattse</title>
                <meta name="description" content="Trending Products on Jhattse. Products at best price with available deals and offers on Jhattse from local stores." />
                <link rel="canonical" href={`https://jhattse.com/product/trending`} />
                <meta property="og:image" content="https://jhattse.com/consumer/square-logo-4x.png" />
                <meta property="og:title" content={`Trending Products on Jhattse`} />
                <meta name="og:description" content={`Trending Products on Jhattse. Products at best price with available deals and offers on Jhattse from local stores.`} />
            </Head>
            <Header />
            <div className="flex p-2 font-manrope">
                <TrendingProducts />
            </div>
            <Navbar />
            <Footer />
        </div>
    )
}

export default Trending