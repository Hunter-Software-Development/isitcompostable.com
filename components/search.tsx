import { Autocomplete, TextField } from "@mui/material";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Link from "next/link";

export default function Search({ allPostsData }: any): JSX.Element {
    return (
        <Autocomplete
            id="highlights-demo"
            sx={{ width: 300 }}
            options={allPostsData}
            getOptionLabel={(option: { title: string; id: string }) => option.title}
            groupBy={(option) => option.title[0].toUpperCase()}
            renderInput={(params) => <TextField {...params} label="Search" margin="normal" />}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.title, inputValue, { insideWords: true });
                const parts = parse(option.title, matches);

                return (
                    <Link href={`/posts/${option.id}`}>
                        <li {...props}>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                >
                                    {part.text}
                                </span>
                            ))}
                        </li>
                    </Link>
                );
            }}
        />
    );
}
