import React from 'react'
import logo from './logo.svg'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './PageShell.css'
import "../index.css";
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