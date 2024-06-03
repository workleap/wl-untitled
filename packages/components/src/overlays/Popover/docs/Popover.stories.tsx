import { InfoIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button, ButtonGroup } from "../../../buttons/index.ts";
import { Footer } from "../../../layout/index.ts";
import { Link } from "../../../Link/index.ts";
import { Text } from "../../../typography/index.ts";
import { Popover, PopoverTrigger } from "../src/Popover.tsx";

/**
 * Popovers are small overlays that open on demand.
 * They let users access additional content and actions without cluttering the page.
 *
 * [View repository](https://github.com/gsoft-inc/wl-hopper/tree/main/packages/components/src/Popover/src)
 * -
 * [View package](https://www.npmjs.com/package/@hopper-ui/components)
 * -
 * View storybook TODO
 */
const meta = {
    title: "Docs/Popover",
    tags: ["autodocs"],
    parameters: {
        // Disables Chromatic's snapshotting on documentation stories
        chromatic: { disableSnapshot: true }
    },
    component: Popover,
    render: props =>
        <PopoverTrigger>
            <Button aria-label="information" variant="secondary"><InfoIcon /></Button>
            <Popover {...props} />
        </PopoverTrigger>
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A Popover can contain title, content, and a footer.
 */
export const Default: Story = {
    args: {
        children: <>
            <Text>Title</Text>
            <p>Popover content</p>
            <Footer>
                <Link href="#">Tell me more</Link>
            </Footer>
        </>
    }
};

/**
 * A popover can have a single button:
 */
export const Buttons: Story = {
    args: {
        children: <>
            <Text>Title</Text>
            <p>Popover content</p>
            <Button>Go it</Button>
        </>
    }
};

/**
 * A popover can have a group of button:
 */
export const MutlipleButton: Story = {
    args: {
        children: <>
            <Text>Title</Text>
            <p>Popover content</p>
            <ButtonGroup>
                <Button variant="secondary">Next</Button>
                <Button>Go it</Button>
            </ButtonGroup>
        </>
    }
};

/**
 * A popover can have footer text.
 */
export const FooterText: Story = {
    args: {
        children: <>
            <Text>Title</Text>
            <p>Popover content</p>
            <Footer>
                All right reserved.
            </Footer>
            <Button>Go it</Button>
        </>
    }
};

/**
 * A popover can open at different positions..
 */
export const Position: Story = {
    args: {
        placement: "right",
        children: <>
            <Text>Title</Text>
            <p>Popover content</p>
        </>
    }
};

/**
 * A popover will not open when its trigger is disabled.
 */
export const DisabledTrigger: Story = {
    render: () =>
        <PopoverTrigger>
            <Button isDisabled variant="secondary"><InfoIcon /></Button>
            <Popover>
                <Text>Title</Text>
                <p>Popover content</p>
            </Popover>
        </PopoverTrigger>
};

const ControlledPopover = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback(
        (newOpen: boolean) => {
            setIsOpen(newOpen);
            // eslint-disable-next-line no-console
            console.log(newOpen);
        },
        [setIsOpen]
    );

    return (
        <PopoverTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Button variant="secondary"><InfoIcon /></Button>
            <Popover>
                <Text>Title</Text>
                <p>Popover content</p>
            </Popover>
        </PopoverTrigger>
    );
};

/**
 * A popover open state can be handled in controlled mode.
 */
export const Controlled: Story = {
    render: () => <ControlledPopover />
};
