import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
    branch,
    clientId: "33051c80-ccab-43d1-8565-64c784feb5c8", // Get this from tina.io
    token: "29e045224b23596af939e393dadc016211fb6e72", // Get this from tina.io
    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "uploads",
            publicFolder: "public",
        },
    },
    schema: {
        collections: [
            {
                name: "item",
                label: "Items",
                path: "items",
                format: "md",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "boolean",
                        name: "compostable",
                    },
                    {
                        type: "boolean",
                        name: "singular",
                    },
                    {
                        name: "imageLink",
                        label: "Image Link",
                        type: "string",
                    },
                    {
                        type: "string",
                        name: "typeOfValue",
                        required: false,
                    },
                    {
                        type: "number",
                        name: "percentNitrogen",
                        required: false,
                    },
                    {
                        type: "number",
                        name: "carbonToNitrogenRatio",
                        required: false,
                    },
                    {
                        type: "number",
                        name: "moistureContentPercentage",
                        required: false,
                    },
                    {
                        type: "number",
                        name: "bulkDensityPoundsPerCubicYard",
                        required: false,
                    },
                    {
                        type: "string",
                        name: "sources",
                        list: true,
                        required: true,
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                ],
                ui: {
                    // This is an DEMO router. You can remove this to fit your site
                    router: ({ document }) => `/items/${document._sys.filename}`,
                    filename: {
                        readonly: true,
                        slugify: (values) => {
                            return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
                        },
                    },
                },
            },
        ],
    },
});
