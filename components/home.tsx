import homeStyles from "../styles/home.module.css";
import Search from "../components/search";

import { StyledDivider, SIZE } from "baseui/divider";
import { Heading, HeadingLevel } from "baseui/heading";
import { Grid, Cell } from "baseui/layout-grid";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParagraphSmall } from "baseui/typography";

const Home = ({ name, allPostsData }: { name?: string; allPostsData: any }): JSX.Element => {
    const title = "Is It Compostable?";
    const description = "Is It Compostable? Find out if an item is compostable or not using sourced data with isitcompostable.com.";

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                openGraph={{
                    url: "https://isitcompostable.com",
                    title: title,
                    type: "website",
                    description: description,
                    images: [{ url: "https://raw.githubusercontent.com/Hunter-Software-Development/isitcompostable.com/main/public/favicon.png" }],
                    siteName: title,
                }}
                twitter={{
                    handle: "@isitcompostable",
                    site: "@isitcompostable",
                    cardType: "summary_large_image",
                }}
            />

            <div className={homeStyles.gridLayout}>
                <Grid>
                    <Cell span={12}>
                        <HeadingLevel>
                            <Heading>{title}</Heading>
                        </HeadingLevel>
                        <StyledDivider $size={SIZE.cell} />
                        <Search allPostsData={allPostsData} size="large" />
                        <ParagraphSmall>
                            Made with ❤️ by{" "}
                            <Link href="https://huntersoftware.dev" target="_blank">
                                Andrew Hunter
                            </Link>
                        </ParagraphSmall>
                    </Cell>
                </Grid>
            </div>
        </>
    );
};

export default Home;
