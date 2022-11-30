import Layout from "../../components/layout";
import { getAllPostIds, getSortedPostsData } from "../../lib/items";
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
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { NextSeo } from "next-seo";

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
    rainbow.setNumberRange(0, 772);
    const color: string = rainbow.colourAt(data.item.carbonToNitrogenRatio);

    const compostabilityQuestion = (data.item.singular ? "Is " : "Are ") + data.item.title + " Compostable?";
    const compostabilityDeclaration = data.item.title + (data.item.singular ? " Is" : " Are") + (data.item.compostable ? "" : " Not") + " Compostable!";

    return (
        <Layout allPostsData={props.allPostsData}>
            <NextSeo
                title={compostabilityQuestion}
                description={compostabilityDeclaration}
                openGraph={{
                    url: currentUri,
                    title: compostabilityQuestion,
                    description: compostabilityDeclaration,
                    images: [{ url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAFcAfQDASIAAhEBAxEB/8QAHAABAQEAAgMBAAAAAAAAAAAAAAIFBggDBAcB/8QANhABAAIABAQEBgAFBAIDAAAAAAECAwQFEgYRUVITIZGSByIxQaHRFDIzcYEIFUJhFyNDcrH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7UgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyuIeI9G4by1Mxr+qZLTsG9ttLZnGrhxaekc/r/h7mm5/J6pkcLOabmsDN5TGjdh42BeL0vH/AFMeUvnmu8PxnPjBhZnXtGw9X0XO6ZXKZacbCjGw8ri0vfEvNq2iaxuiK/N9ZnlEc/PlfwWymbphcSajbScfRNJ1HUPG0/TcekUthYdcOlJtsjypFrVmdv7B9Jehn9a0vTs5lspqGpZLK5rNTtwMHGx60viz0rWZ52/w991q/wBQHwmznFvxN0vUcvqmPg0z2Hh5atYyeNj1wbUnzmb0rNcOvzRPzTHnuB2VEYNPCwaYe61ttYrutPnPL7yA/d8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2TfHS3tlQCd8dLe2RQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIx8TwcDExJjnsrNuXXlDhfB3xH0bXeBdM4m1PMZXQ8tn5xK4dM7mqV863tXlFp5RM/LzBzcePLZjBzWXw8fK4uHjYGJWLUxMO0WraJ+kxMeUw+YaP8atAzek6PnNSw50/E1TUMXIYOFiY1Jinh25Wxb2nlyp/31mIB9TGBxzxXp3BnDWZ1rVfEtgYW2tcPCruxMW9p5VpWPvMy4zwz8Q9VzvE2S0biXg3U9BxM/h3xcnjWxaZjDvFY5zF5p/Tty+0/wBgfRRm4ev6PiavbSsPVchbU6/zZSuYpONH96c+f4eO/E2hUzdMrfWtMrmb4s5euDOapF7YkcudIjnz3RzjnH18wawysvxHomZyeazeX1jTsXK5S23MY1MzS1MGel7RPKv+Xl0/W9K1LNZjLadqeSzeYy/9bCwMet7Yf/2iJ5x/kGgM3I6/o+oahjZHIarkMzncDn4uXwcxS+Jh8vrurE84/wAoy/EeiZnVMTTcvrGnYuo4fPflaZmlsWvL686RPOOX9gao4hwr8ROHOJcvrWYyWoYGFl9JzV8tj4uPjUrXlXl/7Inn/TmZmItPLnyl4eMfiLpOg8EZvibTcXLa3lMvi4eDaMnmaWibXvWn80c4iY3c+QOajjeqcY6TluG9c1bTs5lNT/2jL4uPj4OVzFL2iaVm2yZjntmeUx5mmcZaRjcM6JrOqZ3J6VTVcvh4+Dh5vM0pPO9YttiZmN0xz+wOSDh3F/GOd0nV8jpOgcO5zXtSzWDbMcsPErgYOHhRPLnbFt8vOZ+lfq93gDi3K8acP/7nlMDGyt8PGxMtmMtjct+DjUnlakzHlP8AeOoOSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8OerNslmK1iZtOHaIiPv5OqOU4S1PK/DvgG+c0viDIalkcLO4c4uHpNc/TB341p2Y2VvG75o5crcvu7aAODfBPC1TA+Guk4WuaVgaTm6ReP4XBwfBitN87bTh/wDC0x5zHWft9HwjI8J5/I8H8E5zV+E9QzlchxHmsTOZaNPnFxv4e9pmOeHMc5pM8p6fR2wAfOPjtw3qfEnBGXnQcD+I1DTM9galhZWZ2+P4czzp5/flM+jxaDx3xDxTxNkslpfCWq6VpNcDEtqGc1jLzgWw78vkrhRz+eef1/66ff6YA6o6Zwpqk8PaJwzhcH6lluOsrrUZrM8QWy0RhbYxbWnG/if+cTWYjb9+T2eJeAc3neDPiJj24azONrGZ4snFyuJ/B2nGvl/FpO7Dnlz2cpv5x5fV2lAdZ/iTw5bQv/L2JkdJtkNFx9HyUYFsLA8PAvesxForyiKzMffk/NH4fz+u67o+JwXwznuGb5LhzNZTO5vGy8ZemPj4mDtworeP6vK/K+/z6uxWv6PkOINHzWlavl4zOQzVdmNhTaa7o58+XOJift9pe3lsDDy2XwsDArtwsKkUpXnz5REcogHWfhDh3M5jOfDrT9G4L1LQtb0HMRiazqePlIwaYmHWsxiV8X/5fEn6fX69HrcF8Pazo/Hmi5fStB1HFyuHqeJOPltZ0bD55LCta2/Gpnq/zzynyjnPP6ebtKA6t4WkZ/Q+GuONLyvAuLmMzfiScab4mlTi4X8DbE50vhVjl4uzlzikTyjdz6srOcKa9j8I/E/L5XQtZxq6jmNLxcnS+mfws5mK3+ea4VIiteX3j6xHKbefN25AdbM1oWZ1fXeLdQ4Y4Q1LQtMrwlmNNxMtiZLwJzWamJmtaUr/ADzEeW6OfPlHWGLrvC2uZbH4czep6TqeY0+3CeX0+mHhaPGfvgY9axvwrYduXhWnv/x1drQHyXUdM1nRv9PeX0vJYmuV1PDymDgROXy8Y2dw6WxKxNYpW3LdFJmvOLeURz+z6Jwrw/pvDGg5XSdFy0ZbJYFeVafWZmfObWn6zaZ85mWsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT9Oqd09lvx+zFma4dpj6xDP8AEv329QaG6ey34/Zunst+P2z/ABL99vU8S/fb1Bobp7Lfj9m6ey34/bP8S/fb1PEv329QaG6ey34/Zunst+P2z/Ev329TxL99vUGhunst+P2bp7Lfj9s/xL99vU8S/fb1Bobp7Lfj9m6ey34/bP8AEv329TxL99vUGhunst+P2bp7Lfj9s/xL99vU8S/fb1Bobp7Lfj9m6ey34/bP8S/fb1PEv329QaG6ey34/Zunst+P2z/Ev329TxL99vUGhunst+P2bp7Lfj9s/wAS/fb1PEv329QaG6ey34/Zunst+P2z/Ev329TxL99vUGhunst+P2bp7Lfj9s/xL99vU8S/fb1Bobp7Lfj9m6ey34/bP8S/fb1PEv329QaG6ey34/Zunst+P2z/ABL99vU8S/fb1Bobp7Lfj9v2LTM+dZj+/JneJfvt6vPk72tiTFrTMcvuD2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARjf0b/2lxfiGureDg30aaTelptfDm0Vm8faOcxMcvr5fLP0+aHKcWJnDtEfWYZ2y/bb0B6ue8Wchj+BN6404c7ZrETaJ5faJnl+WFh5rWcLlSmW34UUtMWxOc2tPzcvLy5fSvlPn5/dyfZbtt6Gy3bb0Bx7AzesWw63x8ClI3zXlXDm08vm5T/NH1+X+3/57+iTnZycV1Hl4tYr83LlM/JWZ5+f1584/w0tlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEitlu23obLdtvQEvYyX9af7PDst229HnydLRiTM1mI5fcHuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=" }],
                    siteName: "SiteName",
                }}
            />

            <article>
                <h1 className={utilStyles.headingXl}>{data.item.title}</h1>
                <h4>{compostabilityQuestion}</h4>

                <Card>
                    <StyledBody>
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
