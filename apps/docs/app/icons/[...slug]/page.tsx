import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getIconsSlugs } from "@/app/lib/getSlugs";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import Mdx from "@/components/mdx/Mdx.tsx";
import Title from "@/components/title/Title";
import { allIcons } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        slug: string[];
    };
}

function findPageFromSlug(slug: string[]) {
    const [section, type] = slug;

    return allIcons.find(page => page.section === section && page.slug === type);
}


export default function IconPage({ params }: PageProps) {
    const icons = findPageFromSlug(params.slug);

    if (!icons) {
        notFound();
    }

    const sectionLinks = getSectionLinks(icons);

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={icons._id}>
                <Title level={1}>{icons.title}</Title>
                <Mdx code={icons.body.code} />
            </article>
        </BasePageLayout>
    );
}

export async function generateStaticParams() {
    return getIconsSlugs();
}

export async function generateMetadata({ params }: PageProps) {
    const page = findPageFromSlug(params.slug);

    if (page) {
        const metadata: Record<string, string> = {
            title: page.title
        };

        if (page.description) {
            metadata.description = page.description;
        }


        return metadata;
    }

    return {
        title: null
    };
}
