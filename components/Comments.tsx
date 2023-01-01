import { Notification } from "baseui/notification";
import { ReactCusdis } from "./ReactCusdis";

export interface CommentsProps {
    title: string;
    pageId: string;
    pageUrl: string;
}

const Comments = ({ title, pageId, pageUrl }: CommentsProps) => {
    return (
        <>
            <Notification
                closeable
                overrides={{
                    Body: { style: { width: "auto" } },
                }}
            >
                If you have any additional data regarding the compostability of {title} <strong>please leave a comment!</strong>
            </Notification>
            <br />
            <ReactCusdis
                style={{ height: "400px" }}
                attrs={{
                    host: "https://cusdis.com",
                    appId: "d8e3fcef-35a8-490c-856b-5933d8000c4e",
                    pageId: pageId,
                    pageTitle: title,
                    pageUrl: pageUrl,
                }}
            />
        </>
    );
};

export default Comments;
