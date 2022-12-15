import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

import { getSortedPostsData } from "../../lib/items";
import { Card } from "baseui/card";
import React from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import Link from "next/link";
import { NextSeo } from "next-seo";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }: any) {
    let lastfirst: string = "";

    return (
        <Layout allPostsData={allPostsData}>
            <NextSeo
                title={"All Items"}
                description={"All Items"}
                openGraph={{
                    url: "https://isitcompostable.com/items",
                    title: "All Items",
                    type: "website",
                    description: "All Items",
                    images: [{ url: "https://raw.githubusercontent.com/Hunter-Software-Development/isitcompostable.com/main/public/favicon.png" }],
                    siteName: "Is It Compostable?",
                }}
                twitter={{
                    handle: "@isitcompostable",
                    site: "@isitcompostable",
                    cardType: "summary_large_image",
                }}
            />
            <Head>
                <title>{siteTitle}</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>All Items</h1>
                <Card>
                    {allPostsData.map(function (o: any, i: any) {
                        return (
                            <ListItem key={o.title}>
                                <ListItemLabel>
                                    <Link href={`/items/${o.id}`}>{o.title}</Link>
                                </ListItemLabel>
                            </ListItem>
                        );
                    })}
                </Card>
            </article>
        </Layout>
    );
}
