import { Button, Content, Heading, IllustratedMessage, SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <IllustratedMessage>
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
            <Button>Try again</Button>
        </IllustratedMessage>
    );
}
