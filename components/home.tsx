import homeStyles from "../styles/home.module.css";
import Search from "../components/search";

import { StyledDivider, SIZE } from "baseui/divider";
import { Heading, HeadingLevel } from "baseui/heading";
import { Grid, Cell } from "baseui/layout-grid";
import Head from "next/head";

const Home = ({ name, allPostsData }: { name?: string; allPostsData: any }): JSX.Element => {
    return (
        <>
            <Head>
                <title>Is It Compostable?</title>
            </Head>
            <div className={homeStyles.gridLayout}>
                <Grid>
                    <Cell span={12}>
                        <HeadingLevel>
                            <Heading>{name}</Heading>
                        </HeadingLevel>
                        <StyledDivider $size={SIZE.cell} />
                        <Search allPostsData={allPostsData} />
                    </Cell>
                </Grid>
            </div>
        </>
    );
};

export default Home;
