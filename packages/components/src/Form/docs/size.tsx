import { Button, Form, Label, Stack, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-sm" margin="stack-lg">
            <Form>
                <TextField name="email" placeholder="Enter your email">
                    <Label>Email</Label>
                </TextField>
                <Button type="submit">Sign In</Button>
            </Form>
            <Form size="sm">
                <TextField name="email" placeholder="Enter your email">
                    <Label>Email</Label>
                </TextField>
                <Button type="submit">Sign In</Button>
            </Form>
        </Stack>
    );
}
