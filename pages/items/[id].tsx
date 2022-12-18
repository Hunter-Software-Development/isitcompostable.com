import Layout from "../../components/layout";
import { getAllPostIds, getSortedPostsData } from "../../lib/items";
import Head from "next/head";

import utilStyles from "../../styles/utils.module.css";
import Rainbow from "rainbowvis.js";
import { useRouter } from "next/router";
import { ReactCusdis } from "../../components/ReactCusdis";

import { Card, StyledAction, StyledBody, StyledThumbnail } from "baseui/card";
import { Accordion, Panel } from "baseui/accordion";
import { ListItem, ListItemLabel } from "baseui/list";
import { StyledLink } from "baseui/link";
import { Notification } from "baseui/notification";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { NextSeo } from "next-seo";
import { Breadcrumbs } from "baseui/breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import { relative } from "path";

export async function getStaticProps({ params }: { params: { id: number } }) {
    const allPostsData = getSortedPostsData();

    // Add the "await" keyword like this:
    const { data, query, variables } = await client.queries.item({
        relativePath: `${params.id}.md`,
    });
    return {
        props: {
            data,
            query,
            variables,
            allPostsData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post(props: any) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const router = useRouter();
    const currentUri = "https://isitcompostable.com/items/" + router.query.id;

    const sources = data.item.sources.map((link: string) => (
        <ListItem key={link}>
            <ListItemLabel>
                <StyledLink href={link} target="_blank" rel="noreferrer">
                    {link}
                </StyledLink>
            </ListItemLabel>
        </ListItem>
    ));

    const rainbow = new Rainbow();
    rainbow.setSpectrum("green", "brown");
    rainbow.setNumberRange(0, 60);
    let color: string;
    if (data.item.carbonToNitrogenRatio) {
        color = rainbow.colourAt(data.item.carbonToNitrogenRatio);
    } else {
        color = "brown";
    }

    const compostabilityQuestion = (data.item.singular ? "Is " : "Are ") + data.item.title + " Compostable?";
    const compostabilityDeclaration = data.item.title + (data.item.singular ? " Is" : " Are") + (data.item.compostable ? "" : " Not") + " Compostable!";

    return (
        <Layout allPostsData={props.allPostsData}>
            <NextSeo
                title={compostabilityQuestion}
                description={compostabilityQuestion + " " + compostabilityDeclaration + " " + data.item.body}
                openGraph={{
                    url: currentUri,
                    title: compostabilityQuestion,
                    type: "website",
                    description: compostabilityDeclaration,
                    images: [{ url: "https://raw.githubusercontent.com/Hunter-Software-Development/isitcompostable.com/main/public/favicon.png" }],
                    siteName: "Is It Compostable?",
                }}
                twitter={{
                    handle: "@isitcompostable",
                    site: "@isitcompostable",
                    cardType: "summary_large_image",
                }}
            />

            <article>
                <Card>
                    <h2>{compostabilityQuestion}</h2>

                    <div style={{ position: "relative", height: "200px", width: "100%", overflow: "hidden" }}>
                        <Image src="/uploads/White_Oak_Quercus_alba_Tree_Bark_3264px.jpg" alt={data.item.title} key={data.item.imageLink} style={{ objectFit: "cover" }} fill={true} priority={true} />
                    </div>
                    <StyledBody>
                        <h1>{data.item.title}</h1>
                        <div className={utilStyles.lightText}></div>
                        <p>{compostabilityDeclaration}</p>

                        {data.item.typeOfValue && <div className={utilStyles.lightText}>{data.item.typeOfValue} Values</div>}
                        {data.item.carbonToNitrogenRatio && (
                            <p>
                                Carbon To Nitrogen Ratio: <b style={{ color: `#${color}` }}>{data.item.carbonToNitrogenRatio}:1</b>
                            </p>
                        )}
                        {data.item.percentNitrogen && (
                            <p>
                                Percent Nitrogen <small>(Dry Weight)</small>: {data.item.percentNitrogen}%
                            </p>
                        )}
                        {data.item.moistureContentPercentage && (
                            <p>
                                Moisture Content Percentage <small>(Wet Weight)</small>: {data.item.moistureContentPercentage}%
                            </p>
                        )}
                        {data.item.bulkDensityPoundsPerCubicYard && data.item.bulkDensityPoundsPerCubicYard != 0 && <p>Bulk Density: {data.item.bulkDensityPoundsPerCubicYard} lb/yd³</p>}
                        <TinaMarkdown content={data.item.body} />
                    </StyledBody>

                    <StyledAction>
                        <Accordion accordion>
                            <Panel title="Sources">
                                {sources}
                                <ListItem key={data.item.imageLink}>
                                    <ListItemLabel>
                                        Image courtesy of:
                                        <br />
                                        <StyledLink href={data.item.imageLink} target="_blank" rel="noreferrer">
                                            {data.item.imageLink}
                                        </StyledLink>
                                    </ListItemLabel>
                                </ListItem>
                            </Panel>
                            <Panel title="Comments">
                                <Notification
                                    closeable
                                    overrides={{
                                        Body: { style: { width: "auto" } },
                                    }}
                                >
                                    If you have any additional data regarding the compostability of {data.item.title} <strong>please leave a comment!</strong>
                                </Notification>
                                <br />
                                <ReactCusdis
                                    attrs={{
                                        host: "https://cusdis.com",
                                        appId: "d8e3fcef-35a8-490c-856b-5933d8000c4e",
                                        pageId: data.item.id,
                                        pageTitle: data.item.title,
                                        pageUrl: currentUri,
                                    }}
                                />
                            </Panel>
                            <Panel title="See Also">
                                {props.allPostsData.map(function (o: any, i: any) {
                                    return (
                                        <ListItem key={o.title}>
                                            <ListItemLabel>
                                                <Link href={`/items/${o.id}`}>{o.title}</Link>
                                            </ListItemLabel>
                                        </ListItem>
                                    );
                                })}
                            </Panel>
                        </Accordion>
                    </StyledAction>
                </Card>
                <br />
                <Breadcrumbs>
                    <Link href="/">Home</Link>
                    <Link href="/items">All Items</Link>
                    <span>{data.item.title}</span>
                </Breadcrumbs>
            </article>
        </Layout>
    );
}
