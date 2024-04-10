
// Those are hardcoded since they are used directly in the svg files.
export const NeutralIconColor = "#3C3C3C"; // --hop-neutral-icon
export const PrimaryIconColor = "#3B57FF"; // --hop-primary-icon
export const WarningWeakIconColor = "#E57723"; // --hop-warning-icon-weak

export const DecorativeOption7IconColor = "#2A2620"; // --hop-decorative-option7-icon
export const DecorativeOption7SurfaceColor = "#E5DED6"; // --hop-decorative-option7-surface
export const NeutralSurface = "white"; // --hop-status-neutral-surface

export const IconsSourceDirectory = "src/icons";
export const IconsDistDirectory = "src/optimized-icons";
export const IconSizes = [16, 24, 32] as const;
export const AllowedIconFillColors = [NeutralIconColor, PrimaryIconColor, WarningWeakIconColor];

export const RichIconsSourceDirectory = "src/rich-icons";
export const RichIconsDistDirectory = "src/optimized-rich-icons";
export const RichIconSizes = [24, 32, 40] as const;
export const RichAllowedIconFillColors = [DecorativeOption7IconColor, DecorativeOption7SurfaceColor, NeutralSurface];
