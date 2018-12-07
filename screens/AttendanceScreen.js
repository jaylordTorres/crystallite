import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Title,
  Icon,
  Content
} from "native-base";
import FlashMessage, {
  showMessage,
  hideMessage
} from "react-native-flash-message";

export default class AttendanceScreen extends Component {
  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: "#f15922" }}
          androidStatusBarColor="#f15922"
        >
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Attendance</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(
                    () => {
                      this.props.navigation.navigate("Login");
                    },
                    function(error) {}
                  );
              }}
            >
              <Icon name="log-out" />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <Text>Hello Attendance</Text>
          <FlashMessage position="top" />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
