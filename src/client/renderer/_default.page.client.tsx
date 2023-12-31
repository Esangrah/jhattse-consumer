import ReactDOM from 'react-dom/client'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { PageShell } from '@renderer/PageShell'
import type { PageContextClient } from './types'
import { RecoilRoot } from 'recoil'
import { VariantSelector } from '@components/variant/variantSelector'

export const clientRouting = true
export const hydrationCanBeAborted = true

// This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
let root: ReactDOM.Root;
export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const container = document.getElementById('react-root')
  const page = (
    <PageShell pageContext={pageContext}>
      <RecoilRoot>
        <VariantSelector />
        <Page {...pageProps} />
      </RecoilRoot>
    </PageShell>
  )
  // SPA
  if (container?.innerHTML === '' || !pageContext.isHydration) {
    if (!root) {
      root = createRoot(container as Element)
    }
    root.render(page)
    // SSR
  } else {
    root = hydrateRoot(container as Element, page)
  }
}

/* To enable Client-side Routing:
// export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
