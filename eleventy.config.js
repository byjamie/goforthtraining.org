import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addWatchTarget("src/css");

    /* Markdown config */
    let options = {
        html: true, // Enable HTML tags in source
        linkify: true, // Auto-convert URL-like text to links
        typographer: true, // Enable language-neutral replacement + quotes beautification. Full list of replacements: https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
    };
    eleventyConfig.setLibrary("md", markdownIt(options));
};

export const config = {
    templateFormats: [
        "md",
        "njk",
        "html",
        "11ty.js"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
        input: "src",
        output: "_site"
    },
};