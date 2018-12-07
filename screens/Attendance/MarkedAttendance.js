import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
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
export default class MarkedAttendance extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text style={styles.text}>Marked Attendance</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    alignItems: "center"
  }
});
