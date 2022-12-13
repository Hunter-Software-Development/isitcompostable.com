import homeStyles from "../styles/home.module.css";
import Search from "../components/search";

import { StyledDivider, SIZE } from "baseui/divider";
import { Heading, HeadingLevel } from "baseui/heading";
import { Grid, Cell } from "baseui/layout-grid";
import { NextSeo } from "next-seo";

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
                    siteName: "Is It Compostable?",
                }}
            />

            <div className={homeStyles.gridLayout}>
                <Grid>
                    <Cell span={12}>
                        <HeadingLevel>
                            <Heading>{name}</Heading>
                        </HeadingLevel>
                        <StyledDivider $size={SIZE.cell} />
                        <Search allPostsData={allPostsData} size="large" />
                    </Cell>
                </Grid>
            </div>
        </>
    );
};

export default Home;
