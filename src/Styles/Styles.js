import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: 37,
    marginRight: 37,
    justifyContent: "center",
    alignItems: "center"
  },

  Button: {
    width: "100%",
    height: 54,
    backgroundColor: "#3c8dbc",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.04
  },

  Input: {
    flexDirection: "row",
    height: 46,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },

  Icon: {
    position: "absolute",
    left: 20,
    color: "#202020",
    fontSize: 24
  },

  Badge: {
    position: "absolute",
    right: 20
  },

  Title: {
    color: "#757575",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "normal"
  },

  TextLight: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center"
  },

  TextDark: {
    fontSize: 14,
    color: "#202020",
    fontWeight: "600",
    textAlign: "center"
  },

  loginLogoContainer: {
    flexDirection: "row",
    marginBottom: 100,
  },

  loginLogo: {
    width: 490,
    height: 180
  }
});

export default styles;
