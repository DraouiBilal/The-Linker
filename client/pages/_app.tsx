import "../styles/globals.css";
import NextNProgress from 'nextjs-progressbar'
import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import UserProvider from "../store/providers/userProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <NextNProgress/>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MyApp;
