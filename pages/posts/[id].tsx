import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

import utilStyles from "../../styles/utils.module.css";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Rainbow from "rainbowvis.js";

export async function getStaticProps({ params }: { params: { id: number } }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
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

export default function Post({ postData }: any) {
    const sources = postData.sources.map((link: string) => (
        <li key={link}>
            <a href={link} target="_blank" rel="noreferrer">
                {link}
            </a>
        </li>
    ));

    const rainbow = new Rainbow();
    rainbow.setSpectrum("green", "brown");
    rainbow.setNumberRange(0, 772)
    const color: string = rainbow.colourAt(postData.carbonToNitrogenRatio);

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <Card variant="outlined">
                    <CardContent>
                        <div className={utilStyles.lightText}>{postData.typeOfValue} Values</div>
                        <p>
                            Carbon To Nitrogen Ratio: <b style={{ color: `#${color}` }}>{postData.carbonToNitrogenRatio}:1</b>
                        </p>
                        <p>
                            Percent Nitrogen <small>(Dry Weight)</small>: {postData.percentNitrogen}%
                        </p>
                        <p>
                            Moisture Content Percentage <small>(Wet Weight)</small>: {postData.moistureContentPercentage}%
                        </p>
                        {postData.bulkDensityPoundsPerCubicYard && <p>Bulk Density: {postData.bulkDensityPoundsPerCubicYard} lb/yd³</p>}
                        <p>
                            Source(s): <ul>{sources}</ul>
                        </p>
                    </CardContent>
                </Card>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}
