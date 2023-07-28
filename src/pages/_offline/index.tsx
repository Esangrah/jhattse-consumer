import { Container } from "@components/container";
import { Header } from "@components/header";
import Head from 'react-helmet'


export const Page = () => (
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