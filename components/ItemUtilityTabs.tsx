import React from "react";
import { StatefulTabs, Tab, Tabs, FILL } from "baseui/tabs-motion";
import AllItemsList, { AllItemsListProps } from "./AllItemsList";
import Comments, { CommentsProps } from "./Comments";
import ProductRecommendation, { ProductRecommendationProps } from "./productRecommendation";
import Sources, { SourcesProps } from "./Sources";

interface ItemUtilityTabsProps extends ProductRecommendationProps, SourcesProps, CommentsProps, AllItemsListProps {}

const ItemUtilityTabs = (ItemUtilityTabsObj: ItemUtilityTabsProps) => {
    const [activeKey, setActiveKey] = React.useState(ItemUtilityTabsObj.productTitle ? "0" : "1");

    return (
        <Tabs
            key={ItemUtilityTabsObj.title}
            activeKey={activeKey}
            onChange={({ activeKey }) => {
                setActiveKey(activeKey.toString());
            }}
            fill={FILL.fixed}
            activateOnFocus
            renderAll
        >
            <Tab title="Recommended Products" disabled={!ItemUtilityTabsObj.productTitle}>
                {ItemUtilityTabsObj.productTitle && <ProductRecommendation productTitle={ItemUtilityTabsObj.productTitle} productImageLink={ItemUtilityTabsObj.productImageLink} productReason={ItemUtilityTabsObj.productReason} productLink={ItemUtilityTabsObj.productLink} />}
            </Tab>
            <Tab title="Sources">
                <Sources sources={ItemUtilityTabsObj.sources} imageLink={ItemUtilityTabsObj.imageLink} />
            </Tab>
            <Tab title="Comments">
                <Comments title={ItemUtilityTabsObj.title} pageId={ItemUtilityTabsObj.pageId} pageUrl={ItemUtilityTabsObj.pageUrl} />
            </Tab>
            <Tab title="See Also">
                <AllItemsList allPostsData={ItemUtilityTabsObj.allPostsData} />
            </Tab>
        </Tabs>
    );
};

export default ItemUtilityTabs;
