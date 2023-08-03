import Head from 'react-helmet'
import { Header } from '@components/header';
import { Navbar } from '@components/navbar';
import { TrendingProducts } from '@components/trending';
import { Footer } from '@components/footer';
import { PageContextBuiltIn } from 'vite-plugin-ssr/types';
import { Container } from '@components/container';

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
    return {
        pageContext: {
            documentProps: {
                title: `Trending Products on Jhattse`,
                description: `Trending Products on Jhattse. Products at best price with available deals and offers on Jhattse from local stores.`,
                image: "https://jhattse.com/consumer/square-logo-4x.png",
                keywords: `Local Trending Products,Local Trending Services,Trending Products,Jhattse`,
                canonicalURL: `https://jhattse.com/product/trending`,
            }
        },

    }
}

export const Page = () => {
    return (
        <>
            <Head>
                <title>Trending Products - Jhattse</title>
            </Head>
            <Header />
            <Container>
                <TrendingProducts />
            </Container>
            <Navbar />
            <Footer />
        </>
    )
}