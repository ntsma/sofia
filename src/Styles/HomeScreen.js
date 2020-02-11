import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "space-around",
    marginLeft: 37,
    marginRight: 37,
    margin: "1%",
    marginTop: "5%",
    marginBottom: "5%"
  },

  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "15%",
    backgroundColor: "#3c8dbc"
  },

  Image: {
    width: 35,
    height: 40,
    marginLeft: 20
  },

  Title: {
    fontSize: 24,
    fontWeight: "600"
  },

  Icon: {
    alignSelf: "center",
    color: "#FFF",
    fontSize: 24
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

  Gray: {
    backgroundColor: "#eee"
  }
});

export default styles;
