import router from "next/router";
import { Select, SIZE, TYPE } from "baseui/select";

export default function Search({ allPostsData }: any): JSX.Element {
    return (
        <>
            <Select
                options={allPostsData}
                labelKey="title"
                onChange={(params) => {
                    router.push("/items/" + params.value[0].id);
                }}
                type={TYPE.search}
                size={SIZE.large}
                placeholder="Search"
                required
                autoFocus
            />
        </>
    );
}
