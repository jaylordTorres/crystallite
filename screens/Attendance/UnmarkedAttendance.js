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
export default class UnmarkedAttendance extends Component {
  render() {
    return (
      <Container>
        <Container>
          <Content>
            <Text style={styles.text}>Unmarked Attendance</Text>
          </Content>
        </Container>
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
