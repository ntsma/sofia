import React, { Component } from "react";
import { Container, Header, Content, Accordion } from "native-base";

const dataArray = [
  { title: "Por que alguns pacientes queixar-se de gripe após tomarem a vacina contra gripe? ", content: "Lorem ipsum dolor sit amet" },
  { title: "Por que alguns pacientes queixar-se de gripe após tomarem a vacina contra gripe? ", content: "Lorem ipsum dolor sit amet" },
  { title: "Por que alguns pacientes queixar-se de gripe após tomarem a vacina contra gripe? ", content: "Lorem ipsum dolor sit amet" }
];

export default class AccordionExample extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Accordion dataArray={dataArray} expanded={0}/>
        </Content>
      </Container>
    );
  }
}
