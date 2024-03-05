import { Spinner } from "../../src/Spinner.tsx";
import type { Meta, StoryObj } from "@storybook/react";
import { Inline, Stack } from "../../../layouts/index.ts";

const meta = {
    component: Spinner,
    title: "Components/Spinner",
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }

} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Inline alignItems="end">
            <Spinner size="sm" {...args} />
            <Spinner {...args} />
            <Spinner size="lg" {...args} />
        </Inline>
    ),
    args: {
        "aria-label": "Crawling in progress…"
    }
};

export const InheritColor: Story = {
    render: args => (
        <Inline alignItems="end" backgroundColor="primary-strong">
            <Spinner color="core_samoyed" aria-label="Crawling in progress…" {...args} />
            <Spinner color="core_samoyed" {...args}>Crawling in progress…</Spinner>
        </Inline>
    )
};

export const Styling: Story = {
    render: args => (
        <Inline>
            <Spinner UNSAFE_color="red" {...args}>Crawling in progress…</Spinner>
            <Spinner className="border-red" aria-label="Crawling in progress…" {...args} />
            <Spinner style={{ border: "1px solid red" }} aria-label="Crawling in progress…" {...args} />
        </Inline>
    )
};

export const Zoom: Story = {
    render: args => (
        <Stack>
            <Inline alignItems="end" className="zoom-in">
                <Spinner size="sm" {...args} />
                <Spinner {...args} />
                <Spinner size="lg" {...args} />
            </Inline>
            <Inline alignItems="end" className="zoom-out">
                <Spinner size="sm" {...args} />
                <Spinner {...args} />
                <Spinner size="lg" {...args} />
            </Inline>
        </Stack>
    ),
    args: {
        children: "Crawling in progress…"
    }
};

export const Label: Story = {
    render: args => (
        <Inline alignItems="end" >
            <Spinner size="sm" {...args} />
            <Spinner {...args} />
            <Spinner size="lg" {...args} />
        </Inline>
    ),
    args: {
        children: "Crawling in progress…"
    }
};

export const Overflow: Story = {
    render: args => (
        <Stack UNSAFE_width="4.5rem ">
            <Spinner size="sm" {...args} />
            <Spinner {...args} />
            <Spinner size="lg" {...args} />
        </Stack>
    ),
    args: {
        children: "Crawling in progress…"
    }
};