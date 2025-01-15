import { allComponents } from "@/.contentlayer/generated";
import { getComponentDetails } from "@/app/lib/getComponentDetails.ts";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getComponentsSlugs } from "@/app/lib/getSlugs";
import Heading from "@/app/ui/components/heading/Heading.tsx";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        slug: string[];
    };
}

function findComponentFromSlug(params : { slug: string[] }) {
    const [type] = params.slug;

    const component = allComponents.find(x => x.slug === type);

    if (!component) {
        return null;
    }

    return component;
}

export default async function ComponentPage({ params }: PageProps) {
    const [type] = params.slug;

    const component = await findComponentFromSlug(params);

    if (!component) {
        notFound();
    }
    const componentDetails = await getComponentDetails(component._raw.sourceFilePath);
    const { content, frontmatter: { title, status, description, links } } = componentDetails;

    const componentLinks = links && [
        {
            name: "github",
            src: links.source,
            label: "View source"
        },
        {
            name: "npm",
            src: "https://www.npmjs.com/package/@hopper-ui/components",
            label: "View on npm"
        },
        {
            name: "issue",
            // eslint-disable-next-line max-len
            src: `https://github.com/gsoft-inc/wl-hopper/issues/new?title=🐛%20[${title}]%20-%20<TITLE>&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you're%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._`,
            label: "Report an issue"
        },
        ...(links.aria ? [{
            name: "wai-aria",
            src: links.aria,
            label: "WAI-ARIA"
        }] : [])
    ];

    const sectionLinks = getSectionLinks({ body: { raw: componentDetails.raw } });

    return (
        <div className="hd-section">
            <BasePageLayout showSections={type !== "component-list"} sectionsLinks={sectionLinks}>
                <Heading title={title} tag={status} description={description} links={componentLinks} />
                <div className="hd-content">
                    {content}
                </div>
            </BasePageLayout>
        </div>
    );
}

export async function generateMetadata({ params }: PageProps) {
    const component = findComponentFromSlug(params);

    if (component) {
        const metadata: Record<string, string> = {
            title: component.title
        };

        if (component.description) {
            metadata.description = component.description;
        }


        return metadata;
    }

    return {
        title: null
    };
}


export async function generateStaticParams() {
    return getComponentsSlugs();
}
