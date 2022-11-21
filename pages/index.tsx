import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/items";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Search from "../components/search";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }: any) {

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <section className={utilStyles.headingMd}>
                <Search allPostsData={allPostsData} />
            </section>
        </Layout>
    );
}
