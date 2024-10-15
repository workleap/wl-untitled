"use client";

import { useContext } from "react";
import { HopperProvider } from "@hopper-ui/components";
import { type ColorScheme, ThemeContext } from "@/context/theme/ThemeProvider.tsx";
import OverviewTile from "@/app/ui/components/overview/overviewTile/OverviewTile";

import "./composedComponents.css";

const ComposedComponents = ({ components }) => {
    const { colorMode } = useContext(ThemeContext);
    const theme = colorMode as ColorScheme;

    return (
        <>
            <HopperProvider colorScheme={theme}>
                <div className="hd-composed-components__wrapper">
                    {components.map(component => (
                        <OverviewTile title={component} key={component} />
                    ))}
                </div>
            </HopperProvider>
        </>
    );
};

export default ComposedComponents;
