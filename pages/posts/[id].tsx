import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

import utilStyles from "../../styles/utils.module.css";
import Rainbow from "rainbowvis.js";
import { useRouter } from "next/router";
import { ReactCusdis } from "react-cusdis";
import { ExpandMoreOutlined } from "@mui/icons-material";

import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Card, CardContent, Typography } from "@mui/material";

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
    const router = useRouter();
    const currentUri = "https://isitcompostable.com" + router.pathname;

    const sources = postData.sources.map((link: string) => (
        <li key={link}>
            <a href={link} target="_blank" rel="noreferrer">
                {link}
            </a>
        </li>
    ));

    const rainbow = new Rainbow();
    rainbow.setSpectrum("green", "brown");
    rainbow.setNumberRange(0, 772);
    const color: string = rainbow.colourAt(postData.carbonToNitrogenRatio);

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div style={{ marginBottom: "5px" }}>
                    {postData.singular ? "Is" : "Are"} {postData.title} Compostable?
                </div>
                <Card variant="outlined">
                    <CardContent>
                        {postData.typeOfValue && <div className={utilStyles.lightText}>{postData.typeOfValue} Values</div>}
                        {postData.carbonToNitrogenRatio && (
                            <p>
                                Carbon To Nitrogen Ratio: <b style={{ color: `#${color}` }}>{postData.carbonToNitrogenRatio}:1</b>
                            </p>
                        )}
                        {postData.percentNitrogen && (
                            <p>
                                Percent Nitrogen <small>(Dry Weight)</small>: {postData.percentNitrogen}%
                            </p>
                        )}
                        {postData.moistureContentPercentage && (
                            <p>
                                Moisture Content Percentage <small>(Wet Weight)</small>: {postData.moistureContentPercentage}%
                            </p>
                        )}
                        {postData.bulkDensityPoundsPerCubicYard && <p>Bulk Density: {postData.bulkDensityPoundsPerCubicYard} lb/yd³</p>}
                        <p>Source(s):</p>
                        <ul>{sources}</ul>
                        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                    </CardContent>
                </Card>

                <Accordion sx={{ marginTop: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Comments</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Alert severity="info">
                            <AlertTitle>Beta</AlertTitle>
                            If you have any additional data regarding the compostability of {postData.title} <strong>please leave a comment!</strong>
                        </Alert>
                        <br />
                        <ReactCusdis
                            attrs={{
                                host: "https://cusdis.com",
                                appId: "d8e3fcef-35a8-490c-856b-5933d8000c4e",
                                pageId: postData.id,
                                pageTitle: postData.title,
                                pageUrl: currentUri,
                            }}
                        />
                    </AccordionDetails>
                </Accordion>
            </article>
        </Layout>
    );
}
