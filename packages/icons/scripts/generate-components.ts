import { transform } from "@svgr/core";
import fs from "fs";
import path from "path";
import { PrimaryIconColor, WarningWeakIconColor } from "./constants.ts";
import type { MultiSourceIconSource } from "./fetch-svgs.ts";
import svgoConfig from "./svgo-config.ts";

export async function generateComponents(componentDirectory: string, icons: MultiSourceIconSource[]) {
    // Clear directory (It also removes the directory itself)
    fs.rmSync(componentDirectory, { recursive: true, force: true });
    fs.mkdirSync(componentDirectory, { recursive: true });

    for (const icon of icons) {
        let componentCode = [
            "/**",
            " * This file is generated by the generate-components script. Do not edit directly.",
            " */",
            "/* eslint-disable */",
            "import { createIcon } from \"../create-icon.tsx\";",
            "import { forwardRef, type Ref, type SVGProps } from \"react\";"
        ].join("\n");
        componentCode += "\n\n";

        const baseIconName = `${icon.name}Icon`;

        for (const [size, data] of Object.entries(icon.sizes)) {
            componentCode += transform.sync(data, {
                typescript: true,
                ref: true,
                replaceAttrValues: {
                    [PrimaryIconColor]: "var(--hop-primary-icon)",
                    [WarningWeakIconColor]: "var(--hop-warning-icon-weak)"
                },
                jsxRuntime: "automatic",
                svgoConfig: svgoConfig,
                plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
                template: ({ componentName, jsx, props }, { tpl }) => {
                    return tpl`
                        const ${componentName} = forwardRef((${props}) => (
                            ${jsx}
                        ));
                    `;
                }
            }, {
                componentName: `${baseIconName}${size}`
            });
            componentCode += "\n";
        }
        componentCode += `\nexport const ${baseIconName} = createIcon(${baseIconName}16, ${baseIconName}24, ${baseIconName}32, "${baseIconName}");`;

        const destinationPath = path.resolve(componentDirectory, baseIconName + ".tsx");
        fs.writeFileSync(destinationPath, Buffer.from(componentCode));
    }
}
