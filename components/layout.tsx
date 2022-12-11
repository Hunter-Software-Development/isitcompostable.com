import Head from "next/head";

import styles from "./layout.module.css";

import Link from "next/link";
import Home from "./home";

import { styletron } from "../lib/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, DarkTheme } from "baseui";

import { useEffect, useState } from "react";
import { Block } from "baseui/block";
import Header from "./header";
import { Breadcrumbs } from "baseui/breadcrumbs";

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
            selectTheme("light");
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
                    <Head>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <Header toggleDarkMode={toggleDarkMode} theme={theme} THEME={THEME} home={home} allPostsData={allPostsData} />

                    {home ? (
                        <>
                            <Home name={name} allPostsData={allPostsData} />
                        </>
                    ) : (
                        <div className={styles.container}>
                            <main>{children}</main>
                        </div>
                    )}
                </Block>
            </BaseProvider>
        </StyletronProvider>
    );
}
