import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
            <div>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-0FZWLWCNYW" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-0FZWLWCNYW');
                    `}
                </Script>
            </div>
        </>
    );
}
