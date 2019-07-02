import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

export default class BadgeContent extends Component {

	render () {
		switch(this.props.status_id)
		{
			case 1:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
        			<Text style={styles.badgeText}>ativo</Text>
    			</Badge>
    			);
    			break;
			case 2:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>inativo</Text>
        			</Badge>
    			);
    			break;
			case 3:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aguardando envio</Text>
        			</Badge>
    			);
    			break;
			case 4:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aguardando complemento</Text>
        			</Badge>
    			);
    			break;
			case 5:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aguardando leitura</Text>
        			</Badge>
    			);
    			break;
			case 6:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aguardando telerregulação</Text>
        			</Badge>
    			);
    			break;
			case 7:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aceite telerregulação atrasado</Text>
        			</Badge>
    			);
    			break;
			case 8:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>em telerregulação</Text>
        			</Badge>
    			);
    			break;
			case 9:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>execução telerregulação atrasada</Text>
        			</Badge>
    			);
    			break;
			case 10:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#39cccc"}]}>
            			<Text style={styles.badgeText}>aguardando teleconsultor</Text>
        			</Badge>
    			);
    			break;
			case 11:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aceite teleconsultoria atrasado</Text>
        			</Badge>
    			);
    			break;
			case 12:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>resposta em execução</Text>
        			</Badge>
    			);
    			break;
			case 13:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>execução teleconsultoria atrasado</Text>
        			</Badge>
    			);
    			break;
			case 14:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aguardando agendamento</Text>
        			</Badge>
    			);
    			break;
			case 15:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>agendamento atrasado</Text>
        			</Badge>
    			);
    			break;
			case 16:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>agendamento realizado</Text>
        			</Badge>
    			);
    			break;
			case 18:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>agendamento confirmado</Text>
        			</Badge>
    			);
    			break;
			case 19:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>aguardando leitura justificativa cancelamento</Text>
        			</Badge>
    			);
    			break;
			case 20:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>cancelada</Text>
        			</Badge>
    			);
    			break;
			case 21:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#39cccc"}]}>
            			<Text style={styles.badgeText}>aguardando avaliação</Text>
        			</Badge>
    			);
    			break;
			case 22:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#00a65a"}]}>
            			<Text style={styles.badgeText}>avaliada</Text>
        			</Badge>
    			);
    			break;
			case 23:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>finalizada</Text>
        			</Badge>
    			);
    			break;
			case 24:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>devolvido para o telerregulador</Text>
        			</Badge>
    			);
    			break;
			case 25:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>devolvido para o solicitante</Text>
        			</Badge>
    			);
    			break;
			case 27:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>muito satisfeito</Text>
        			</Badge>
    			);
    			break;
			case 28:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>satisfeito</Text>
        			</Badge>
    			);
    			break;
			case 29:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>indiferente</Text>
        			</Badge>
    			);
    			break;
			case 29:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>insatisfeito</Text>
        			</Badge>
    			);
    			break;
			case 29:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>muito insatisfeito</Text>
        			</Badge>
    			);
    			break;
			case 29:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>atendeu totalmente</Text>
        			</Badge>
    			);
    			break;
			default:
				return (
					<Badge style={[styles.badge, {backgroundColor: "#e4e4e4"}]}>
            			<Text style={styles.badgeText}>respondida</Text>
        			</Badge>
    			);
		}
	}
}

const styles = StyleSheet.create ({
  badge: {
    height: 20,
    marginTop: 5,
    marginBottom: -5
  },
  badgeText: {
    fontSize: 10,
    margin: -2
  }
});
