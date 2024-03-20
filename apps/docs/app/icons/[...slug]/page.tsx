import { notFound } from "next/navigation";
import { allIcons } from "contentlayer/generated";

import Aside from "@/components/ui/aside/Aside.tsx";
import Mdx from "@/components/ui/mdx/Mdx";
import getSectionLinks from "@/utils/getSectionLinks.ts";

interface PageProps {
    params: {
        slug: string[];
    };
}

export async function generateStaticParams() {
    return allIcons.map(({ slug, section }) => ({
        slug: [section, slug]
    }));
}

export default function IconPage({ params }: PageProps) {
    const [ section, type ] = params.slug;
    const icons = allIcons.find(icon => icon.slug === type && icon.section === section);

    if (!icons) {
        notFound();
    }

    const sectionLinks = getSectionLinks(icons);

    return (
        <div className="hd-container">
            <Aside title="On this page" links={sectionLinks} />
            <main>
                <article key={icons._id}>
                    <Mdx code={icons.body.code} />
                </article>
            </main>
        </div>
    );
}
