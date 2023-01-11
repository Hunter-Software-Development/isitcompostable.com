import { StyledLink } from "baseui/link";
import { ListItem, ListItemLabel } from "baseui/list";

export interface SourcesProps {
    sources?: [string];
    imageLink?: string;
}

const Sources = ({ sources, imageLink }: SourcesProps) => {
    return (
        <>
            {sources &&
                sources.map((link: string) => (
                    <ListItem key={link}>
                        <ListItemLabel>
                            <StyledLink href={link} target="_blank" rel="noreferrer">
                                {link}
                            </StyledLink>
                        </ListItemLabel>
                    </ListItem>
                ))}
            <ListItem key={imageLink}>
                <ListItemLabel>
                    Image courtesy of:
                    <br />
                    <StyledLink href={imageLink} target="_blank" rel="noreferrer">
                        {imageLink}
                    </StyledLink>
                </ListItemLabel>
            </ListItem>
        </>
    );
};
export default Sources;
