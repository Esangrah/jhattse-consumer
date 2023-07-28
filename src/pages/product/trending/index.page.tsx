import Head from 'react-helmet'
import { Header, Navbar } from '@components';
import { TrendingProducts } from '@components/trending';
import { Footer } from '@components/footer';


export const Page = () => {
    return (
        <>
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
        </>
    )
}