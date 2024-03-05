import { useContextProps } from "react-aria-components";
import styles from "./IconList.module.css";
import { IconListContext } from "./IconListContext.ts";
import { forwardRef, type ForwardedRef, type CSSProperties } from "react";
import type { BaseComponentProps } from "../../index.ts";
import clsx from "clsx";
import { useStyledSystem, type StyledSystemProps } from "@hopper-ui/styled-system";

// TODO: create some kind of meta object with global css selectors, default slot and context?
const GlobalIconListCssSelector = "hop-IconList";
const DefaultIconListSlot = "icon";

export interface IconListProps extends StyledSystemProps, BaseComponentProps {

}

function IconList(props:IconListProps, ref: ForwardedRef<HTMLSpanElement>) {
    [props, ref] = useContextProps({ ...props, slot: props.slot || DefaultIconListSlot }, ref, IconListContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { children, style, className, slot, ...otherProps } = ownProps;

    const classNames = clsx(
        className,
        GlobalIconListCssSelector,
        styles["hop-iconList"],
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <span
            {...otherProps}
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
        >
            {children}
        </span>
    );
}

/**
 * A component that allows you to render a list of icons
 *
 * [View Documentation](TODO)
 */
const _IconList = forwardRef<HTMLSpanElement, IconListProps>(IconList);
_IconList.displayName = "IconList";

export { _IconList as IconList };