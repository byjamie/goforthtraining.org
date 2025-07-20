import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import pluginTOC from "@uncenter/eleventy-plugin-toc";
import slugify from "slugify";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addWatchTarget("src/css");

    // Config for anchored headings
    let markdownItAnchorOptions = {
        level: [2, 3, 4],
        slugify: (str) => slugify(str, {
            lower: true,
            strict: true,
            remove: /["]/g,
        }),
        tabIndex: false,
    };

    // Markdown config
    let markdownLibrary = markdownIt({
        html: true, // Enable HTML tags in source
        linkify: true, // Auto-convert URL-like text to links
        typographer: true, // Enable language-neutral replacement + quotes beautification. Full list of replacements: https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
    }).use(markdownItAnchor, markdownItAnchorOptions);

    eleventyConfig.setLibrary("md", markdownLibrary);

    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

    // Table of Contents plugin by uncenter
    eleventyConfig.addPlugin(pluginTOC, {
        ul: true,
        wrapper: function(toc) {
            return `<details open class="toc"><summary><strong>Table of Contents</strong></summary>${toc}</details>`;
        }
    });

    eleventyConfig.addPairedShortcode("callout", function(content, icon, label) {
        return `<div class="callout"><div class="callout-label"><i class="ti ti-${icon}" aria-hidden="true"></i><b>${label}</b></div>${content}</div>`;
    });
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