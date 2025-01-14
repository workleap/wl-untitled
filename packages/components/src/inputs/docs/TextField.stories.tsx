import { SearchIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";

import { Stack } from "../../layout/index.ts";
import { TextField } from "../src/TextField.tsx";

/**
 * A text field allows a user to enter a plain text value with a keyboard.
 *
 * [View repository](https://github.com/gsoft-inc/wl-hopper/tree/main/packages/components/src/TextField/src)
 * -
 * [View package](https://www.npmjs.com/package/@hopper-ui/components)
 * -
 * View storybook TODO
 *
 * Specialized text fields are available for different scenarios:
 * - If you want a textfield with type="search", use the `SearchField` component.
 * - If you want a textfield that shows/hides a password, use the `PasswordField` component.
 */
const meta = {
    title: "Docs/TextField",
    tags: ["autodocs"],
    parameters: {
        // Disables Chromatic's snapshotting on documentation stories
        chromatic: { disableSnapshot: true }
    },
    component: TextField,
    args: {
        placeholder: "Placeholder",
        label: "TextField Label"
    }
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 *
 */
export const Default: Story = {
    render: args => (
        <Stack>
            <TextField size="sm" {...args} />
            <TextField {...args} />
        </Stack>
    )
};

/**
 * If a visible label isn't specified, an aria-label must be provided to the TextField for accessibility. If the field is labeled by a separate element, an aria-labelledby prop must be provided using the id of the labeling element instead.
 */
export const Labeling: Story = {
    ...Default,
    args: {
        ...Default.args,
        label: undefined,
        "aria-label": "Label"
    }
};

/**
 * An icon can be displayed at the start of the input.
 */
export const PrefixIcon: Story = {
    ...Default,
    args: {
        ...Default.args,
        prefix: <SearchIcon />
    }
};

/**
 * A short text can be displayed at the start of the input.
 */
export const PrefixText: Story = {
    ...Default,
    args: {
        ...Default.args,
        prefix: "$"
    }
};

/**
 * A character count can be displayed at the end of the input.
 * The character count is based on the `maxLength` prop.
 * If the `maxLength` prop is not set, the character count will not be displayed.
 */
export const CharacterCount: Story = {
    ...Default,
    args: {
        ...Default.args,
        showCharacterCount: true,
        maxLength: 60
    }
};

/**
 * The `isClearable` prop can be set to `true` to display a clear button at the end of the input.
 */
export const Clearable: Story = {
    ...Default,
    args: {
        ...Default.args,
        isClearable: true
    }
};

/**
 * A text field with a helper message.
 */
export const Description: Story = {
    ...Default,
    args: {
        ...Default.args,
        description: "Helper message"
    }
};

/**
 * A text field with an error message.
 */
export const Error: Story = {
    ...Default,
    args: {
        ...Default.args,
        errorMessage: "Error message",
        isInvalid: true
    }
};

/**
 * A text field in a disabled state shows that an input field exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.
 */
export const Disabled: Story = {
    ...Default,
    args: {
        ...Default.args,
        isDisabled: true
    }
};

/**
 * * The `isReadOnly` prop makes the TextField's text content immutable. Unlike `isDisabled`, the TextField remains focusable and the contents can still be copied. See [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) for more information.
 */
export const ReadOnly: Story = {
    ...Default,
    args: {
        isReadOnly: true
    }
};
