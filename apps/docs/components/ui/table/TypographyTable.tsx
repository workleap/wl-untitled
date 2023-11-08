"use client";

import React from "react";
import TypographyPreview from "@/components/preview/TypographyPreview";
import Code from "@/components/ui/code/Code";

import "./table.css";

interface TypographyTableProps {
    type: string;
    data: Record<string, { name: string; value: string }[]>;
}

type FontProperty = "fontFamily" | "fontSize" | "fontWeight" | "lineHeight";

type Size = "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";

type GroupedItems = Record<Size, Record<FontProperty, string>>;

const TypographyTable = ({ type, data }: TypographyTableProps) => {
    interface TokenData {
        [category: string]: { name: string; value: string }[];
    }

    const transformDataToTokenData = (inputData: Record<string, { name: string; value: string }[]>): TokenData => {
        const tokenData: TokenData = {};

        for (const propertyKey in inputData) {
            const items = inputData[propertyKey];
            if (Array.isArray(items)) {
                tokenData[propertyKey as FontProperty] = items;
            }
        }

        return tokenData;
    };

    function groupItemsByPropertiesAndSizes(tokenData: TokenData, itemType: string): GroupedItems {
        const sizes = ["3xl", "2xl", "xl", "lg", "md", "sm", "xs"];
        const properties = ["fontFamily", "fontSize", "fontWeight", "lineHeight"];

        const groupedItems: GroupedItems = {} as GroupedItems;

        sizes.forEach(size => {
            const sizeKey = size as Size;
            groupedItems[sizeKey] = {} as Record<FontProperty, string>;

            properties.forEach(property => {
                const propertyKey = property as FontProperty;

                if (!tokenData[propertyKey]) {
                    return;
                }

                const matchingItem = tokenData[propertyKey].find(item => {
                    const nameParts = item.name.split("-");

                    return nameParts.includes(itemType === "overline" ? "md" : itemType) && nameParts.includes(size);
                });

                if (matchingItem) {
                    groupedItems[sizeKey][propertyKey] = matchingItem.value;
                }
            });

            if (Object.values(groupedItems[sizeKey]).every(value => !value)) {
                delete groupedItems[sizeKey];
            }
        });

        return groupedItems;
    }

    const tokenData = transformDataToTokenData(data);
    const filteredData = groupItemsByPropertiesAndSizes(tokenData, type);

    const listItems = Object.keys(filteredData).map(size => {
        const {
            fontFamily,
            fontSize,
            fontWeight,
            lineHeight
        } = filteredData[size as Size];

        // If the itemType is 'overline', set displaySize to an empty string
        let displaySize = `-${size}`;
        if (type === "overline") {
            displaySize = "";
        }

        let previewAdditionalStyles = {};

        if (type === "overline") {
            previewAdditionalStyles = {
                textTransform: "uppercase"
            };
        }

        return (
            <React.Fragment key={`${type}${size}`}>
                <tr className="hd-typo__row hd-top__row">
                    {type !== "overline" && <td className="hd-table__cell hd-typo__cell" rowSpan={4}>{size}</td>}
                    <td className="hd-table__cell hd-typo__cell" colSpan={3}>
                        Font Size
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        <Code value={`--hop-${type}${displaySize}-font-size`}>{`--hop-${type}${displaySize}-font-size`}</Code>
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        {fontSize}
                    </td>
                    <td className="hd-table__cell hd-typo__cell" rowSpan={4}>
                        <TypographyPreview style={{ ...previewAdditionalStyles }} values={{ lineHeight, fontSize, fontWeight, fontFamily }} />
                    </td>
                </tr>
                <tr className="hd-typo__row">
                    <td className="hd-table__cell hd-typo__cell" colSpan={3}>
                        Font Weight
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        <Code value={`--hop-${type}${displaySize}-font-weight`}>{`--hop-${type}${displaySize}-font-weight`}</Code>
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        {fontWeight}
                    </td>
                </tr>
                <tr className="hd-typo__row">
                    <td className="hd-table__cell hd-typo__cell" colSpan={3}>
                        Line Height
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        <Code value={`--hop-${type}${displaySize}-line-height`}>{`--hop-${type}${displaySize}-line-height`}</Code>
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        {lineHeight}
                    </td>
                </tr>
                <tr className="hd-typo__row">
                    <td className="hd-table__cell hd-typo__cell" colSpan={3}>
                        Font-Family
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        <Code value={`--hop-${type}${displaySize}-font-family`}>{`--hop-${type}${displaySize}-font-family`}</Code>
                    </td>
                    <td className="hd-table__cell hd-typo__cell">
                        {fontFamily}
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    return (
        <>
            <table className="hd-table hd-typo-table" aria-label="Tokens">
                <thead>
                    <tr>
                        {type !== "overline" && <th className="hd-table__column">Name</th>}
                        <th className="hd-table__column" colSpan={5}>Values</th>
                        <th className="hd-table__column">Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </>
    );
};

export default TypographyTable;
