import router from "next/router";
import { Select, SIZE, TYPE } from "baseui/select";
import React from "react";

export default function Search({ allPostsData, size }: { allPostsData: any; size: "mini" | "default" | "compact" | "large" }): JSX.Element {
    const [value, setValue] = React.useState();
    return (
        <Select
            options={allPostsData}
            labelKey="title"
            onChange={(params) => {
                router.push("/items/" + params.value[0].id);
            }}
            type={TYPE.search}
            size={SIZE[size]}
            placeholder="Search"
            value={value}
            clearable={false}
            aria-label={"Search"}
            overrides={{
                StatefulMenu: {
                    props: {
                        stateReducer: (type: string, next: { highlightedIndex: string | number }) => {
                            if (type == "mouseEnter") {
                                // This is done differently than onChange be aware.
                                router.prefetch("/items/" + allPostsData[next.highlightedIndex].id);
                            }
                            return next;
                        },
                    },
                },
            }}
        />
    );
}
