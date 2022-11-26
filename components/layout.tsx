import Head from "next/head";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import Link from "next/link";
import Home from "./home";

// header
import { HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList } from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import Bulb from "./bulb";

// Base web

import { styletron } from "../lib/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, DarkTheme } from "baseui";

import { useEffect, useState } from "react";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import { Block } from "baseui/block";

const blockProps = {
    color: "contentPrimary",
    backgroundColor: "backgroundPrimary",
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100%",
};

const THEME = {
    light: "light",
    dark: "dark",
};

const name = "Is It Compostable?";
export const siteTitle = "Is It Compostable";

export default function Layout({ children, home, allPostsData }: { children?: JSX.Element[] | JSX.Element; home?: boolean; allPostsData?: any }) {
    const [theme, setTheme] = useState(THEME.light);

    useEffect(() => {
        initializeDarkMode();
    }, []);

    const selectTheme = (theme: string) => {
        if (theme === "dark") {
            setTheme(THEME.dark);
            localStorage.setItem("theme", "dark");
            document.documentElement.style.backgroundColor = "rgb(20, 20, 20)";
        } else {
            setTheme(THEME.light);
            localStorage.setItem("theme", "light");
            document.documentElement.style.backgroundColor = "";
        }
    };

    const toggleDarkMode = () => {
        // if set via local storage previously
        if (localStorage.getItem("theme")) {
            if (localStorage.getItem("theme") === "light") {
                selectTheme("dark");
            } else {
                selectTheme("light");
            }
            // if NOT set via local storage previously
        } else {
            selectTheme("dark");
        }
    };

    const initializeDarkMode = () => {
        if (!localStorage.getItem("theme")) {
            selectTheme("dark");
            return;
        }

        if (localStorage.getItem("theme") === "dark") {
            selectTheme("dark");
        } else {
            selectTheme("light");
        }
    };

    return (
        <StyletronProvider value={styletron}>
            <BaseProvider theme={theme === THEME.light ? LightTheme : DarkTheme}>
                <Block {...blockProps}>
                    {/* <Button>Toggle light/dark theme!</Button> */}
                    <Head>
                        <link rel="icon" href="/favicon.ico" />
                        <meta name="description" content="Learn how to build a personal website using Next.js" />
                        <meta property="og:image" content={`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`} />
                        <meta name="og:title" content={siteTitle} />
                        <meta name="twitter:card" content="summary_large_image" />
                    </Head>

                    <HeaderNavigation>
                        <NavigationList $align={ALIGN.center} />
                        <NavigationList $align={ALIGN.right}>
                            <NavigationItem>
                                <Button
                                    onClick={() => toggleDarkMode()}
                                    size={SIZE.compact}
                                    kind={KIND.tertiary}
                                    shape={SHAPE.square}
                                    title="Toggle theme"
                                    overrides={{
                                        BaseButton: {
                                            style: {
                                                display: "flex",
                                            },
                                        },
                                    }}
                                >
                                    <Bulb size={24} color={theme === THEME.light ? "black" : "white"} />
                                </Button>
                            </NavigationItem>
                        </NavigationList>
                    </HeaderNavigation>
                    {home ? (
                        <>
                            <Home name={name} allPostsData={allPostsData} />
                        </>
                    ) : (
                        <div className={styles.container}>
                            <header className={styles.header}>
                                <>
                                    <h2 className={utilStyles.headingLg}>
                                        <Link href="/" className={utilStyles.colorInherit}>
                                            {name}
                                        </Link>
                                    </h2>
                                </>
                            </header>
                            <main>{children}</main>
                            <div className={styles.backToHome}>
                                <Link href="/">← Back to home</Link>
                            </div>
                        </div>
                    )}
                </Block>
            </BaseProvider>
        </StyletronProvider>
    );
}
