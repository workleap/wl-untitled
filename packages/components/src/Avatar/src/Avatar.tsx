import { BrokenImageRichIcon } from "@hopper-ui/icons";
import { type ResponsiveProp, useStyledSystem, type StyledSystemProps, useResponsiveValue } from "@hopper-ui/styled-system";
import { filterDOMProps } from "@react-aria/utils";
import clsx from "clsx";
import { type CSSProperties, forwardRef, type ForwardedRef, useMemo, type ReactNode, type ReactEventHandler } from "react";
import { useContextProps } from "react-aria-components";

import { Text, type TextProps } from "../../typography/Text/index.ts";
import { type SizeAdapter, cssModule, type BaseComponentProps } from "../../utils/index.ts";

import { AvatarContext } from "./AvatarContext.ts";
import { RichIconAvatarImage } from "./RichIconAvatarImage.tsx";
import { useImageFallback } from "./useImageFallback.ts";

import styles from "./Avatar.module.css";

export const GlobalAvatarCssSelector = "hop-Avatar";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type AvatarImageBaseProps = React.HTMLProps<HTMLImageElement>;

export interface AvatarInitialsProps {
    /**
     * The name of the Avatar. This will be used for the alt text of the image or the initials if no image is provided.
     */
    name: string;
    /**
     * The size of the avatar.
     * * @default "md"
     */
    size: ResponsiveProp<AvatarSize>;
}

export interface AvatarImageProps {
    children?: ReactNode;
    /**
     * Props to add to the img element when src is provided.
     */
    imageProps?: AvatarImageBaseProps;
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
    /**
     * The size of the avatar.
     * * @default "md"
     */
    size: ResponsiveProp<AvatarSize>;
    /**
     * The src of the image to display. If not provided, the initials will be displayed instead.
     */
    src: string;
    /**
    * The src of the image to display if the image fails to load. If set to null, the initials will be displayed instead.
    * * @default "BrokenImageRichIcon"
    */
    fallbackSrc?: string | null;
}

export interface AvatarProps extends StyledSystemProps, BaseComponentProps, Omit<AvatarImageProps, "size" | "src">, Omit<AvatarInitialsProps, "size"> {
    /**
     * The size of the avatar.
     * * @default "md"
     */
    size?: ResponsiveProp<AvatarSize>;
    /**
     * The src of the image to display. If not provided, the initials will be displayed instead.
     */
    src?: string;
}

export const AvatarToTextSizeAdapter: SizeAdapter<AvatarProps["size"], TextProps["size"]> = {
    xs: "xs",
    sm: "xs",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "xl"
};

function getColorIndex(name: string, maxNumberOfColor: number) {
    let hashCode = 0;

    for (let i = name.length - 1; i >= 0; i--) {
        const character = name.charCodeAt(i);
        const shift = i % 8;

        hashCode ^= (character << shift) + (character >> (8 - shift));
    }

    return hashCode % maxNumberOfColor;
}

function getColorName(name: string) {
    const variantToUse = `option${getColorIndex(name, 8) + 1}`;

    return `decorative-${variantToUse}`;
}

function AvatarInitials(props: AvatarInitialsProps) {
    const { 
        name,
        size: sizeValue
    } = props;
    
    const size = useResponsiveValue(sizeValue) ?? "md";

    const initials = useMemo(() => {
        const cleanName = name.replace(/\s+/g, " ").trim();
        const [firstName, lastName] = cleanName.split(" ");
        const letters = firstName && lastName
            ? `${firstName.charAt(0)}${lastName.charAt(0)}`
            : firstName.charAt(0);

        return size === "xs" && letters.length > 1 ? letters.charAt(0) : letters;
    }, [name, size]);

    return (
        <Text
            size={AvatarToTextSizeAdapter[size]}
            className={styles["hop-Avatar__initials"]}
        >
            {initials}
        </Text>
    );
}

function Avatar(props: AvatarProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AvatarContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        fallbackSrc,
        imageProps,
        isDisabled,
        name,
        size: sizeValue,
        slot,
        src,
        style,
        ...otherProps
    } = ownProps;
    const domProps = filterDOMProps(otherProps);
    
    const { onError, ...otherImageProps } = imageProps ?? {};
    const [imageUrl, handleImageError, imageFailed] = useImageFallback(src, fallbackSrc);

    const size = useResponsiveValue(sizeValue) ?? "md";
    const isBrokenImage = src && imageFailed && fallbackSrc === undefined;
    const isImage = src && !imageFailed;
    const isInitials = !src || (src && imageFailed && fallbackSrc === null);

    const classNames = clsx(
        className,
        GlobalAvatarCssSelector,
        cssModule(
            styles,
            "hop-Avatar",
            size,
            isBrokenImage && "broken-image",
            isImage && "image",
            isInitials && getColorName(name)
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    const handleError: ReactEventHandler<HTMLImageElement> = e => {
        handleImageError?.(e);
        onError?.(e);
    };

    let content = <AvatarInitials
        {...otherProps}
        name={name}
        size={size}
    />;
    
    if (src) {
        if (imageFailed) {
            if (fallbackSrc !== null) {
                return (
                    <RichIconAvatarImage
                        {...domProps}
                        className={classNames}
                        isDisabled={isDisabled}
                        ref={ref}
                        size={size}
                        slot={slot}
                        style={mergedStyles}
                    >
                        <BrokenImageRichIcon />
                    </RichIconAvatarImage>
                );
            }
        } else {
            content = <img
                {...filterDOMProps(otherImageProps)}
                alt=""
                aria-hidden
                className={styles["hop-Avatar__image"]}
                onError={handleError}
                src={imageUrl}
            />;
        }
    }
    
    return (
        <div
            {...domProps}
            className={classNames}
            data-disabled={isDisabled || undefined}
            role="img"
            slot={slot ?? undefined}
            ref={ref}
            style={mergedStyles}
        >
            {content}
        </div>
    );
}

/**
 * Avatars are used to show a thumbnail representation of an individual, team or group in the interface.
 *
 * [View Documentation](TODO)
 */
const _Avatar = forwardRef<HTMLDivElement, AvatarProps>(Avatar);
_Avatar.displayName = "Avatar";

export { _Avatar as Avatar };