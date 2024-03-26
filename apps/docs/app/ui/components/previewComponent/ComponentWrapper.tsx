"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { StyledSystemProvider } from "@hopper-ui/styled-system";
import Card from "@/components/card/Card.tsx";
import PreviewSkeleton from "@/app/ui/components/previewComponent/PreviewSkeleton.tsx";
import ThemeSwitch from "@/components/themeSwitch/ThemeSwitch.tsx";
import type { ColorScheme } from "@/context/theme/ThemeProvider.tsx";

const ComponentWrapper = ({ key, className, name }: {
    key: string;
    className: string;
    name: string;
}) => {
    const DynamicComponent = useMemo(() => dynamic(() => import(`../../../../../../packages/components/src/${name}.tsx`), {
        ssr: false,
        loading: () => <PreviewSkeleton overlay />
    }), [name]);

    const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        const theme: ColorScheme = colorScheme === "dark"
            ? "light"
            : "dark";

        setColorScheme(theme);
    };

    return (
        <StyledSystemProvider colorScheme={colorScheme} key={key}>
            <div className={clsx("hd-component-wrapper", `hd-component-wrapper--${colorScheme}`)}>
                <ThemeSwitch className="hd-component-wrapper__action" onChange={toggleTheme} colorMode={colorScheme} />
                <Card className={className} key={key} size="sm">
                    <DynamicComponent />
                </Card>
            </div>
        </StyledSystemProvider>
    );
};

export default ComponentWrapper;