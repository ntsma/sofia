import React, {Component} from "react";

import {
  View,
  ScrollView,
  FlatList
} from 'react-native';

import {
  Header,
  Avatar,
  Badge,
  Card,
  Icon,
  Text,
  ThemeProvider

} from "react-native-elements";

export default class FAQ extends Component {
  render() {
    const questions = [
      { title: "Quem pode ser doadora de leite humano?",
        content: "Algumas mulheres quando estão amamentando produzem um volume de leite além da necessidade do bebê, o que possibilita que sejam doadoras de um Banco de Leite Humano. De acordo com a legislação que regulamenta o funcionamento dos Bancos de Leite no Brasil (RDC Nº 171) a doadora, além de  apresentar excesso de leite, deve ser saudável, não usar medicamentos que impeçam a doação e se dispor a ordenhar e a doar o excedente." },
      { title: "Como doar?",
        content: "Se você quer doar seu leite entre em contato com um Banco de Leite Humano. Clique aqui e encontre o mais próximo de você." },
      { title: "Como preparar o frasco para coletar o leite humano?" ,
        content: "1. Escolha um frasco de vidro com tampa plástica, pode ser de café solúvel ou maionese; 2. Retire o rótulo e o papelão que fica sob a tampa e lave com água e sabão, enxaguando bem; 3. Em seguida coloque em uma panela o vidro e a tampa e cubra com água, deixando ferver por 15 minutos (conte o tempo a partir do início da fervura); 4. Escorra a água da panela e coloque o frasco e a tampa para secar de boca para baixo em um pano limpo; 5. Deixe escorrer a água do frasco e da tampa. Não enxugue; 6. Você  poderá usar quando estiver seco." },
      { title: "Como se preparar para retirar o leite humano (ordenhar)?",
        content: "Comece fazendo massagem suave e circular nas mamas. Massageie as mamas com as polpas dos dedos   começando na aréola (parte escura da mama) e, de forma circular,  abrangendo toda mama."},
      { title: "É ideal que o leite seja retirado de forma manual:",
        content: "1. Primeiro coloque os dedos polegar e indicador no local onde começa a aréola (parte escura da mama); 2. Firme os dedos e empurre para trás em direção ao corpo; 3. Comprima suavemente um dedo contra o outro, repetindo esse movimento várias vezes até o leite começar a sair; 4. Despreze os primeiros jatos ou gotas e inicie a coleta no frasco. Se você estiver com dificuldade de retirar seu leite, procure apoio no Banco de Leite Humano mais próximo de você. "},
      { title: "Como guardar o leite retirado para doação?",
        content: "O frasco com o leite retirado deve ser armazenado no congelador ou freezer. Na próxima vez que for retirar o leite, utilize outro recipiente esterilizado e ao terminar acrescente este leite no frasco que está no freezer ou congelador. O leite pode ficar armazenado congelado por até 15 dias. O leite humano doado, após passar por processo que envolve seleção, classificação e pasteurização, é distribuído com qualidade certificada aos bebês   internados em unidades neonatais."}
    ];

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
