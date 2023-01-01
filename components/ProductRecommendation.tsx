import { Card, StyledBody, StyledThumbnail, StyledAction } from "baseui/card";
import { StyledLink } from "baseui/link";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export interface ProductRecommendationProps {
    productTitle?: string;
    productImageLink?: string;
    productReason: TinaMarkdownContent;
    productLink?: string;
}

const ProductRecommendation = ({ productTitle, productImageLink, productReason, productLink }: ProductRecommendationProps) => {
    return (
        <Card title={productTitle}>
            <StyledThumbnail src={productImageLink} />
            <StyledBody>
                <TinaMarkdown content={productReason} />
            </StyledBody>
            <StyledAction>
                <StyledLink href={productLink} target="_blank">
                    Shop Now
                </StyledLink>
            </StyledAction>
        </Card>
    );
};

export default ProductRecommendation;
