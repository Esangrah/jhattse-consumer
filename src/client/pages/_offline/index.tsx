import { Container } from '@components/container'
import dynamic from 'next/dynamic';
import Head from 'react-helmet'

const Header = dynamic(() => import("../../src/components/header").then((mod) => mod.Header), {
    ssr: false,
});

const Fallback = () => (
  <>
    <Head>
      <title>Jhattse - Offline</title>
    </Head>
    <Container>
        <Header />
        <div className="flex flex-col flex-grow justify-center">
            <h1>You are currently offline</h1>
            <h2>Go online to explore more on Jhattse</h2>
        </div>
    </Container>
  </>
)

export default Fallback