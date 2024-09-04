import { NumberField, Label } from "@hopper-ui/components";
import { UserIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <NumberField prefix={<UserIcon />}>
            <Label>Number of users:</Label>
        </NumberField>
    );
}