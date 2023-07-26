import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class CustomDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" sizes="152x152" href="https://cdn.jhattse.com/public/consumer/ios/152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.jhattse.com/public/consumer/ios/180.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="https://cdn.jhattse.com/public/consumer/ios/167.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.jhattse.com/public/consumer/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.jhattse.com/public/consumer/favicon-16x16.png" />
                    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
                    <meta name="theme-color" content="#000" />
                    <meta httpEquiv='content-language' content='en-US' />
                    <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet" />
                    {/* <!-- Google tag (gtag.js) --> */}
                    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6NQFW01JGJ" strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {` 
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-6NQFW01JGJ');
                        `}
                    </Script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument;
