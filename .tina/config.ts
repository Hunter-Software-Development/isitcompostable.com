import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
    branch,
    clientId: null, // Get this from tina.io
    token: null, // Get this from tina.io
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
                        type: "string",
                        name: "typeOfValue",
                    },
                    {
                        type: "number",
                        name: "percentNitrogen",
                    },
                    {
                        type: "number",
                        name: "carbonToNitrogenRatio",
                    },
                    {
                        type: "number",
                        name: "moistureContentPercentage",
                    },
                    {
                        type: "number",
                        name: "bulkDensityPoundsPerCubicYard",
                    },
                    {
                        type: "string",
                        name: "sources",
                        list: true,
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
                },
            },
        ],
    },
});
