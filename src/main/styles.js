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
  },
  title: {
    marginTop: "32px"
  },
  subTitle: {
    marginTop: "24px"
  },
  para: {
    marginTop: "16px"
  },
  buttonsContainer: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    marginLeft: "8px",
    marginRight: "8px"
  }
};
