import { allComponents, allGettingStarteds, allIcons, allTokens } from "@/.contentlayer/generated";

export function getGettingStartedSlugs() {
    return allGettingStarteds.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getTokensSlugs() {
    return allTokens.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getIconsSlugs() {
    return allIcons.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getComponentsSlugs() {
    return allComponents.map(({ slug }) => {
        return ({
            slug: [slug]
        });
    });
}
