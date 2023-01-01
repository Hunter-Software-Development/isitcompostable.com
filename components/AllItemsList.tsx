import { ListItem, ListItemLabel } from "baseui/list";
import Link from "next/link";

export interface AllItemsListProps {
    allPostsData: [{}];
}

const AllItemsList = ({ allPostsData }: AllItemsListProps) => {
    return (
        <>
            {allPostsData.map(function (o: any, i: any) {
                return (
                    <ListItem key={o.title}>
                        <ListItemLabel>
                            <Link href={`/items/${o.id}`}>{o.title}</Link>
                        </ListItemLabel>
                    </ListItem>
                );
            })}
        </>
    );
};

export default AllItemsList;
