import React from 'react'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './PageShell.css'
import '../index.css';
import 'virtual:uno.css'
import { ChakraProvider } from '@chakra-ui/react'

export { PageShell }

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <PageContextProvider pageContext={pageContext}>
          {children}
        </PageContextProvider>
      </ChakraProvider>
    </React.StrictMode>
  )
}