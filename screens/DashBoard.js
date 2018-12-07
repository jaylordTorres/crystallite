import React, { Component } from "react";
import { Text, StyleSheet, View, WebView } from "react-native";
import {
  Button,
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Icon
} from "native-base";
export default class DashBoard extends Component {
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
            <Title>DashBoard</Title>
          </Body>
          <Right>
            {/* <Button
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
            </Button> */}
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Text>DashBoard</Text>
          <WebView
            source={{
              uri: "https://reactjs.org/"
            }}
            style={{}}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
