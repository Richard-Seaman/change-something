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
  mainPageRoot: {
    paddingBottom: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textPageRoot: {
    display: "flex",
    flexGrow: 1,
    marginTop: pixels.gobalSpacing,
    flexDirection: "column",
    paddingBottom: "16px",
    paddingLeft: pixels.gobalSpacing,
    paddingRight: pixels.gobalSpacing,
    maxWidth: "1500px",
    width: "100%"
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
  contentContainer: {
    maxWidth: "1500px",
    margin: "0 16px",
    padding: "0 16px"
  },
  button: {
    margin: "16px"
  },
  featureImageContainer: {
    height: "400px",
    width: "100%",
    position: "relative"
  },
  featureImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  imageOverlayContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    display: "flex",
    flexDirection: "column"
  },
  actionButtonContainer: {
    display: "flex",
    flexDirection: "row"
  },
  tabsContainer: {
    margin: "0 16px"
  }
};
