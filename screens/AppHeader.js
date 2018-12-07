import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Header, Left, Body, Title, Right, Button, Icon } from "native-base";
import firebase from "react-native-firebase";

export default class AppHeader extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: "#f15922" }}
        androidStatusBarColor="#f15922"
      >
        <Left>
          <Button transparent onPress={this.props.navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>My App</Title>
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
    );
  }
}

const styles = StyleSheet.create({});
