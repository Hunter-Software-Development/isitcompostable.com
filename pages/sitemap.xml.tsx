import { getAllPostIds } from "../lib/items";
const EXTERNAL_DATA_URL = "https://isitcompostable.com";

function generateSiteMap(items: any) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     <url>
     <loc>${EXTERNAL_DATA_URL}/items</loc>
   </url>
     ${items
         .map(({ params }: { params: { id: string } }) => {
             return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/items/${params.id}`}</loc>
       </url>
     `;
         })
         .join("")}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
    const items = getAllPostIds();

    // We generate the XML sitemap with the items data
    const sitemap = generateSiteMap(items);

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
