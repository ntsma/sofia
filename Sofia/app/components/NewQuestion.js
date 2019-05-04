import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import {Textarea, Button, Header, Left, Body, Icon, Container, Content, Title, Form, Label, Input, Item} from 'native-base';

export default class NewQuestion extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon type="AntDesign" name="left" />
          </Left>
          <Body>
            <Title>Nova Pergunta</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Título</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Descrição</Label>
              <Input style={{ height: 100 }} />
            </Item>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Button success>
                <Text>    Enviar    </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }


}
