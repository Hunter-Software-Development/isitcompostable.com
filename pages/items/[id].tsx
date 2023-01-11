import Layout from "../../components/layout";
import { getAllPostIds, getSortedPostsData } from "../../lib/items";

import utilStyles from "../../styles/utils.module.css";
import Rainbow from "rainbowvis.js";
import { useRouter } from "next/router";
import { ReactCusdis } from "../../components/ReactCusdis";

import { Card, StyledAction, StyledBody, StyledThumbnail } from "baseui/card";
import { Accordion, Panel } from "baseui/accordion";
import { ListItem, ListItemLabel } from "baseui/list";
import { StyledLink } from "baseui/link";
import { Notification } from "baseui/notification";
import { COLOR } from "baseui/badge";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { ParagraphSmall } from "baseui/typography";
import { Tag, SIZE } from "baseui/tag";
import { Tabs, Tab, ORIENTATION, StatefulTabs } from "baseui/tabs-motion";
import { Breadcrumbs } from "baseui/breadcrumbs";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import ItemUtilityTabs from "../../components/ItemUtilityTabs";

export async function getStaticProps({ params }: { params: { id: number } }) {
    const allPostsData = getSortedPostsData();

    // Add the "await" keyword like this:
    const { data, query, variables } = await client.queries.item({
        relativePath: `${params.id}.md`,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const { base64, img } = data.item.imageLink
        ? await getPlaiceholder(data.item.imageLink ?? "", {
              size: 64,
          })
        : { base64: false, img: [] };

    return {
        props: {
            data,
            query,
            variables,
            allPostsData,
            imageProps: {
                ...img,
                blurDataURL: base64,
            },
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
    const compostabilityDeclaration = (data.item.complicated ? "It's a bit complicated but " : "") + data.item.title + (data.item.singular ? " is" : " are") + (data.item.compostable ? "" : " not") + " compostable!";

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
                    {props.imageProps.src && (
                        <div style={{ position: "relative", height: "200px", width: "100%", overflow: "hidden" }}>
                            <Image src={props.imageProps.src} blurDataURL={props.imageProps.blurDataURL} alt={`public${data.item.image}`} key={data.item.imageLink} style={{ objectFit: "cover" }} placeholder="blur" fill priority />
                        </div>
                    )}
                    <StyledBody>
                        <h1>
                            {data.item.title}
                            {data.item.phosphorus && (
                                <StatefulPopover content={() => <ParagraphSmall padding="scale500">Contains phosphorus</ParagraphSmall>} accessibilityType={"tooltip"} placement={PLACEMENT.top}>
                                    <Tag closeable={false} size={SIZE.small} kind="accent" color={COLOR.accent}>
                                        P
                                    </Tag>
                                </StatefulPopover>
                            )}
                            {data.item.potassium && (
                                <StatefulPopover content={() => <ParagraphSmall padding="scale500">Contains potassium</ParagraphSmall>} accessibilityType={"tooltip"} placement={PLACEMENT.top}>
                                    <Tag closeable={false} size={SIZE.small} kind="negative" color={COLOR.accent}>
                                        K
                                    </Tag>
                                </StatefulPopover>
                            )}
                        </h1>

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
                        <ItemUtilityTabs key={data.item.title} productTitle={data.item.recommendedProductTitle} productImageLink={data.item.recommendedProductImageLink} productReason={data.item.recommendedProductReason} productLink={data.item.recommendedProductLink} sources={data.item.sources} imageLink={data.item.imageLink} title={data.item.title} pageId={data.item.id} pageUrl={data.item.pageUrl} allPostsData={props.allPostsData} />
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
