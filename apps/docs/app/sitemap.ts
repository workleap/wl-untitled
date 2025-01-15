import type { MetadataRoute } from "next";
import { getComponentsSlugs, getGettingStartedSlugs, getIconsSlugs, getTokensSlugs } from "./lib/getSlugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = "https://hopper.workleap.design/";

    // Fetch dynamic paths (replace with your logic to fetch dynamic routes)
    const dynamicPages = await fetchDynamicPaths();

    // Define static pages
    const staticPages = ["/"];

    // Combine static and dynamic pages into sitemap entries
    const urls = [...staticPages, ...dynamicPages].map<MetadataRoute.Sitemap[number]>(path => ({
        url: `${siteUrl}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly"
    }));

    return urls;
}

async function fetchDynamicPaths(): Promise<string[]> {
    const gettingStartedLinks = getGettingStartedSlugs().map(x => `/getting-started/${x.slug.join("/")}`);
    const iconsLinks = getIconsSlugs().map(x => `/icons/${x.slug.join("/")}`);
    const tokensLinks = getTokensSlugs().map(x => `/tokens/${x.slug.join("/")}`);
    const componentsLinks = getComponentsSlugs().map(x => `/components/${x.slug.join("/")}`);

    return [...gettingStartedLinks, ...iconsLinks, ...tokensLinks, ...componentsLinks];
}
