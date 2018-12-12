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
import VideoComponent from "./VideoComponent";
export default class SettingScreen extends Component {
  render() {
    return (
      <View>
        <VideoComponent />
      </View>
      // <Container>
      //   <Header
      //     style={{ backgroundColor: "#f15922" }}
      //     androidStatusBarColor="#f15922"
      //   >
      //     <Left>
      //       <Button
      //         transparent
      //         onPress={() => {
      //           this.props.navigation.toggleDrawer();
      //         }}
      //       >
      //         <Icon name="menu" />
      //       </Button>
      //     </Left>
      //     <Body>
      //       <Title>Settings</Title>
      //     </Body>
      //     <Right>
      //       {/* <Button
      //         transparent
      //         onPress={() => {
      //           firebase
      //             .auth()
      //             .signOut()
      //             .then(
      //               () => {
      //                 this.props.navigation.navigate("Login");
      //               },
      //               function(error) {}
      //             );
      //         }}
      //       >
      //         <Icon name="log-out" />
      //       </Button> */}
      //     </Right>
      //   </Header>
      //   <Content contentContainerStyle={{ flexGrow: 1 }}>
      //     <Text>Settings</Text>
      //   </Content>
      // </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
