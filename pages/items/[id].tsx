import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/items";
import Head from "next/head";

import utilStyles from "../../styles/utils.module.css";
import Rainbow from "rainbowvis.js";
import { useRouter } from "next/router";
import { ReactCusdis } from "../../components/ReactCusdis";

import { Card, StyledAction, StyledBody } from "baseui/card";
import { Accordion, Panel } from "baseui/accordion";
import { ListItem, ListItemLabel } from "baseui/list";
import { StyledLink } from "baseui/link";
import { Notification, KIND } from "baseui/notification";

import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import { Check } from "baseui/icon";

export async function getStaticProps({ params }: { params: { id: number } }) {
    // Add the "await" keyword like this:
    const { data, query, variables } = await client.queries.item({
        relativePath: `${params.id}.md`,
    });
    return {
        props: {
            data,
            query,
            variables,
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

    console.log(data);

    const router = useRouter();
    const currentUri = "https://isitcompostable.com" + router.pathname;

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
    rainbow.setNumberRange(0, 772);
    const color: string = rainbow.colourAt(data.item.carbonToNitrogenRatio);

    return (
        <Layout>
            <Head>
                <title>{data.item.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{data.item.title}</h1>
                <h4>
                    {data.item.singular ? "Is" : "Are"} {data.item.title} Compostable?
                </h4>

                <Card>
                    <StyledBody>
                        <div className={utilStyles.lightText}></div>

                        <p>
                            {data.item.title} {data.item.singular ? "Is" : "Are"} {data.item.compostable ? "" : "Not"} Compostable!
                        </p>

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
                        <div dangerouslySetInnerHTML={{ __html: data.item.contentHtml }} />
                    </StyledBody>

                    <StyledAction>
                        <Accordion onChange={({ expanded }) => console.log(expanded)} accordion>
                            <Panel title="Sources">{sources}</Panel>
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
                        </Accordion>
                    </StyledAction>
                </Card>
            </article>
        </Layout>
    );
}
