import { allTokens } from "contentlayer/generated";
import { notFound } from "next/navigation";

import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getTokensSlugs } from "@/app/lib/getSlugs";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import Mdx from "@/components/mdx/Mdx.tsx";

interface PageProps {
    params: {
        slug: string[];
    };
}

function findPageFromSlug(slug: string[]) {
    const [section, type] = slug;

    return allTokens.find(page => page.section === section && page.slug === type);
}

export default function TokenPage({ params }: PageProps) {
    const designToken = findPageFromSlug(params.slug);

    if (!designToken) {
        notFound();
    }

    const sectionLinks = getSectionLinks(designToken);

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={designToken._id}>
                <h1 className="hd-title hd-title--level1">{designToken.title}</h1>
                <Mdx code={designToken.body.code} />
            </article>
        </BasePageLayout>
    );
}

export async function generateStaticParams() {
    return getTokensSlugs();
}

// The sections are Overview, Semantic and Core. we want all title in "Core" to be "Core " + "Color"(the token type) + " Tokens"
export async function generateMetadata({ params }: PageProps) {
    const page = findPageFromSlug(params.slug);

    if (!page) {
        return {
            title: null
        };
    }

    const { title, section, description } = page;

    let pageTitle = `${title}`;
    if (section === "core") {
        pageTitle = `Core ${title} Tokens`;
    } else if (section === "semantic") {
        pageTitle = `Semantic ${title} Tokens`;
    }

    const metadata: Record<string, string> = {
        title: pageTitle
    };

    if (description) {
        metadata.description = description;
    }


    return metadata;
}
