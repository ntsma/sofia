/*FAQ.js*/

import React, {Component} from "react";

import {
  View,
  ScrollView,
  FlatList
} from 'react-native';

import {
  Card,
  Icon,
  Text,
  ThemeProvider

} from "react-native-elements";

export default class FAQ extends Component {
  render() {
    const questions = [
                      {
                      	"title": "O que perguntar?",
                      	"content": "Você pode realizar perguntas sobre procedimentos clínicos, ações de saúde e processos de trabalho, ou qualquer questão que seja relativa à sua profissão, com foco sempre na atenção primária."
                      },

                      {
                      	"title": "Por que minha teleconsultoria foi devolvida?",
                      	"content": "Uma teleconsultoria é devolvida quando o teleconsultor necessita de mais informações para melhor responder a sua dúvida. Nesse caso, você pode entrar novamente no seu perfil, clicar em solicitação devolvida e verificar quais foram as informações solicitadas, adicioná-las e, após isso, clique em enviar teleconsultoria e aguarde por sua resposta na plataforma."
                      },

                      {
                      	"title": "Por que minha teleconsultoria foi cancelada?",
                      	"content": "Uma teleconsultoria será cancelada sempre que fugir do escopo do Programa. Respondemos perguntas com temas relacionados com a Atenção Primária. As relacionadas à atenção secundária e ou terciária não serão respondidas."
                      },

                      {
                      	"title": "Por que minha teleconsultoria foi finalizada?",
                      	"content": "Sua solicitação será finalizada se no prazo de 30 dias após ter sido respondida se você não realizar sua leitura. Esse processo é automático. Evite o cancelamento lendo a resposta no prazo estipulado (30 dias)."
                      },

                      {
                      	"title": "Como faço para ver minha resposta na SOFIA?",
                      	"content": "Após entrar em seu perfil, na página inicial você verá todas as solicitações que realizou e seus devidos status, as solicitações que já foram respondidas estarão com status de “ aguarda leitura”. Clique no número ID ao lado do status de cor amarela e realize a sua leitura, não esquecendo de também fazer a sua avaliação."
                      },

                      {
                      	"title": "Como faço para avaliar a solicitação?",
                      	"content": "Após realizar a sua leitura na plataforma, ao lado da sua resposta você verá “Avalie nossa resposta” e logo abaixo duas opções: “Grau de satisfação” e “A resposta atendeu a sua dúvida?” Marque a quantidade de  estrelas de acordo com o seu critério de avaliação."
                      },

                      {
                      	"title": "Quanto tempo tenho para ler a resposta?",
                      	"content": "Logo após a solicitação entrar em sua caixa de entrada, você tem um prazo de 30 dias para fazer a leitura, após o prazo, automaticamente será finalizada."
                      },

                      {
                      	"title": "O que ganho fazendo teleconsultorias?",
                      	"content": "Você tem a oportunidade de tirar suas dúvidas referentes à atenção básica com um acesso fácil e rápido utilizando seu próprio computador, celular ou tablet para acessar a plataforma do Programa."
                      },

                      {
                      	"title": "Por que fazer teleconsultoria quando posso pesquisar na internet?",
                      	"content": "Porque os profissionais que irão lhe responder são competentes e capacitados para melhor lhe atender. Nosso programa oferece respostas estruturadas, baseadas em evidências científicas inclusive com as referências bibliográficas para que você possa continuar pesquisando."
                      },

                      {
                      	"title": "Por que minha equipe ficou inativa?",
                      	"content": "Porque os profissionais que a compõem ficaram muito tempo sem fazer uma solicitação na Plataforma."
                      },

                      {
                      	"title": "Como ativo a minha equipe?",
                      	"content": "Para ativar a sua equipe, basta qualquer profissional que compõe a equipe realizar uma teleconsultoria na Plataforma do Programa. Fazendo isso, automaticamente a equipe estará ativa."
                      }]

   return (
     <ThemeProvider>
       <FlatList
        data={questions}
        keyExtractor={(item, index) => item.title}
        renderItem={({item}) => <Card
                                >
                                  <Text
                                    style={{marginBottom: 10}}
                                    onPress={() => this.props.navigation.navigate("Question", {item})}
                                  >
                                    {item.title}
                                  </Text>
                                </Card>}
      />

     </ThemeProvider>

    );
 }
}
