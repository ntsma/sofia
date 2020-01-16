import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class BadgeContent extends Component {
  render() {
    switch (this.props.status_id) {
      case 1:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>ativo</Text>
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>inativo</Text>
          </View>
        );
        break;
      case 3:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>aguardando envio</Text>
          </View>
        );
        break;
      case 4:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>aguardando complemento</Text>
          </View>
        );
        break;
      case 5:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>aguardando leitura</Text>
          </View>
        );
        break;
      case 6:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>aguardando telerregulação</Text>
          </View>
        );
        break;
      case 7:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>aceite telerregulação atrasado</Text>
          </View>
        );
        break;
      case 8:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>em telerregulação</Text>
          </View>
        );
        break;
      case 9:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>execução telerregulação atrasada</Text>
          </View>
        );
        break;
      case 10:
        return (
          <View style={[styles.Badge, { backgroundColor: "#39cccc" }]}>
            <Text style={styles.Text}>aguardando teleconsultor</Text>
          </View>
        );
        break;
      case 11:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>aceite teleconsultoria atrasado</Text>
          </View>
        );
        break;
      case 12:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>resposta em execução</Text>
          </View>
        );
        break;
      case 13:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>execução teleconsultoria atrasado</Text>
          </View>
        );
        break;
      case 14:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>aguardando agendamento</Text>
          </View>
        );
        break;
      case 15:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>agendamento atrasado</Text>
          </View>
        );
        break;
      case 16:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>agendamento realizado</Text>
          </View>
        );
        break;
      case 18:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>agendamento confirmado</Text>
          </View>
        );
        break;
      case 19:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>
              aguardando leitura justificativa cancelamento
            </Text>
          </View>
        );
        break;
      case 20:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>cancelada</Text>
          </View>
        );
        break;
      case 21:
        return (
          <View style={[styles.Badge, { backgroundColor: "#39cccc" }]}>
            <Text style={styles.Text}>aguardando avaliação</Text>
          </View>
        );
        break;
      case 22:
        return (
          <View style={[styles.Badge, { backgroundColor: "#00a65a" }]}>
            <Text style={styles.Text}>avaliada</Text>
          </View>
        );
        break;
      case 23:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>finalizada</Text>
          </View>
        );
        break;
      case 24:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>devolvido para o telerregulador</Text>
          </View>
        );
        break;
      case 25:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>devolvido para o solicitante</Text>
          </View>
        );
        break;
      case 27:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>muito satisfeito</Text>
          </View>
        );
        break;
      case 28:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>satisfeito</Text>
          </View>
        );
        break;
      case 29:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>indiferente</Text>
          </View>
        );
        break;
      case 29:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>insatisfeito</Text>
          </View>
        );
        break;
      case 29:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>muito insatisfeito</Text>
          </View>
        );
        break;
      case 29:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>atendeu totalmente</Text>
          </View>
        );
        break;
      default:
        return (
          <View style={styles.Badge}>
            <Text style={styles.Text}>respondida</Text>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  Badge: {
    alignSelf: "flex-start",
    backgroundColor: "#3c8dbc",
    borderRadius: 10,
    marginTop: 5
  },

  Text: {
    color: "#FFF",
    fontSize: 10,

    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4
  }
});
