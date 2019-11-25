import {
  Dimensions,
  StyleSheet
} from "react-native";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "space-around",
    marginLeft: 37,
    marginRight: 37,
    margin: "1%"
  },

  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "15%",
    backgroundColor: "#3c8dbc"
  },

  ExitButton: {
    width: 40,
    height: 50,
    marginRight: 10
  },

  Body: {
    width: "100%",
    height: "85%"
  },

  Button: {
    width: "100%",
    height: 54,
    backgroundColor: "#eee",
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
  }
});

export default styles;