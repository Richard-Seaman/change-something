import { pixels, colors } from "./constants";

export const commonStyles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  pageContainer: {
    paddingLeft: pixels.gobalSpacing,
    paddingRight: pixels.gobalSpacing,
    paddingTop: pixels.gobalSpacing,
    height: pixels.contentHeight,
    display: "flex",
    background: colors.grey2
  }
};
