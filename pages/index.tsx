import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/items";

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
        <Layout home allPostsData={allPostsData}>
            <Head>
                <title>{siteTitle}</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
        </Layout>
    );
}
