import { Inline, RadioGroup, Radio, RadioList } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <RadioGroup orientation="horizontal">
                <RadioList>
                    <Radio value="manager">Manager</Radio>
                    <Radio value="designer">Designer</Radio>
                </RadioList>
            </RadioGroup>
            <RadioGroup orientation="vertical">
                <RadioList>
                    <Radio value="manager">Manager</Radio>
                    <Radio value="designer">Designer</Radio>
                </RadioList>
            </RadioGroup>
        </Inline>
    );
}