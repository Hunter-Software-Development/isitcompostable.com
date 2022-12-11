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
                    description: "All Items",
                    images: [{ url: "data:image/jpeg;base64,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" }],
                    siteName: "Is It Compostable?",
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
