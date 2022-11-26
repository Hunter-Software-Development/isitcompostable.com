import router from "next/router";
import { Select } from "baseui/select";

export default function Search({ allPostsData }: any): JSX.Element {
    return (
        <>
            <Select
                options={allPostsData}
                labelKey="title"
                onChange={(params) => {
                    router.push("/items/" + params.value[0].id);
                }}
                placeholder="Search"



                required
                autoFocus
            />
        </>
    );
}
