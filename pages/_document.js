import Document, { Html, Head, Main, NextScript } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../lib/styletron";

class MyDocument extends Document {
    static async getInitialProps(context) {
        const renderPage = () =>
            context.renderPage({
                enhanceApp: (App) => (props) =>
                    (
                        <StyletronProvider value={styletron}>
                            <App {...props} />
                        </StyletronProvider>
                    ),
            });

        const initialProps = await Document.getInitialProps({
            ...context,
            renderPage,
        });
        const stylesheets = styletron.getStylesheets() || [];
        return { ...initialProps, stylesheets };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {this.props.stylesheets.map((sheet, i) => (
                        <style className="_styletron_hydrate_" dangerouslySetInnerHTML={{ __html: sheet.css }} media={sheet.attrs.media} data-hydrate={sheet.attrs["data-hydrate"]} key={i} />
                    ))}

                    {/* PWA Config */}
                    <meta name="application-name" content="Is It Compostable?" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Is It Compostable?" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
