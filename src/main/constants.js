// Define the whole app style guide here
export const globalSpacing = 16;
export const headerHeight = 64;

export const colors = {
  blue: "#3f51b5",
  blueLight: "#2196f3",
  white: "#ffffff",
  red: "#e57373",
  yellow: "#ffc107",
  grey1: "#fafafa",
  grey2: "#f0f0f0",
  grey3: "#f5f5f5",
  grey4: "#999999",
  fontGreyDark: "#424242",
  fontGreyLight: "rgba(0, 0, 0, 0.4)",
  fontGreyLessLight: "rgba(0, 0, 0, 0.6)",
  fontLessWhite: "rgba(255, 255, 255, 0.6)",
  green: "#26a69a",
  errorRed: "#f44336",
  purple: "#673ab7"
};

export const pixels = {
  gobalSpacing: `${globalSpacing}px`,
  globalHalfSpacing: `${globalSpacing / 2}px`,
  globalDoubleSpacing: `${globalSpacing * 2}px`,
  headerHeight: `${headerHeight}px`,
  contentHeight: `calc(100vh - ${headerHeight}px)`,
  fontTiny: "10px",
  fontSmall: "12px",
  fontNormal: "14px",
  fontLarge: "15px",
  fontBig: "18px",
  maxPageWidth: "1500px"
};

export const border = {
  style_1px: `solid 1px ${colors.grey2}`
};

export const typoProps = {
  para: {
    variant: "body1",
    color: "inherit",
    align: "left"
  },
  title: {
    variant: "h6",
    color: "inherit",
    align: "left"
  },
  subTitle: {
    variant: "subtitle1",
    color: "textPrimary",
    align: "left"
  }
};

export const VALIDATORS_BY_NAME = {
  REQUIRED: "required",
  STRING: "string",
  NUMBER: "number"
};
