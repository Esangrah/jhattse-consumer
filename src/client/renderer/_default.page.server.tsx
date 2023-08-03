// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'routeParams']
import ReactDOMServer from 'react-dom/server'
import { PageShell } from '@renderer/PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import type { PageContextServer } from '@renderer/types'
import { RecoilRoot } from 'recoil'

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  let pageHtml
  if (Page) {
      pageHtml = ReactDOMServer.renderToString(
        <PageShell pageContext={pageContext}>
            <RecoilRoot>
                <Page {...pageProps} />
            </RecoilRoot>
        </PageShell>
      )
  } else {
    pageHtml = '';
  }

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'Jhattse'
  const ogTitle = documentProps && documentProps?.ogTitle || documentProps && documentProps?.title
  const ogDescription = documentProps && documentProps?.ogDescription || documentProps && documentProps?.description
  const ogImage = documentProps && documentProps?.ogImage || documentProps && documentProps?.image
  const ogURL = documentProps && documentProps?.ogURL || documentProps && documentProps?.canonicalURL;
  const seoText = `<title>${title}</title>
  ${documentProps && documentProps?.description != undefined ? `<meta name="Description" content="${documentProps?.description}" />`: ""}
  ${documentProps && documentProps?.keywords != undefined ? `<meta name="Keywords" content="${documentProps?.keywords}" />`: ""}
  ${documentProps && documentProps?.canonicalURL != undefined ? `<link rel="canonical" href="${documentProps?.canonicalURL}" />`: ""}
  ${ogTitle != undefined ? `<meta property="og:title" content="${ogTitle}" />`: ""}
  ${ogDescription != undefined ? `<meta property="og:description" content="${ogDescription}" />`: ""}
  ${ogImage != undefined ? `<meta name="og:image" content="${ogImage}" />`:""}
  ${ogURL != undefined ? `<meta property="og:url" content="${ogURL}" />`:"" }`

  const documentHtml = escapeInject`<!DOCTYPE html>
  <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="152x152" href="https://cdn.jhattse.com/public/consumer/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.jhattse.com/public/consumer/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="https://cdn.jhattse.com/public/consumer/ios/167.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.jhattse.com/public/consumer/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.jhattse.com/public/consumer/favicon-16x16.png" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        ${dangerouslySkipEscape(seoText)}
        <meta name="theme-color" content="#000" />
        <meta httpEquiv='content-language' content='en-US' />
        <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6NQFW01JGJ" strategy="afterInteractive" />
        <script id="google-analytics" strategy="afterInteractive">
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6NQFW01JGJ');
        </script>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}