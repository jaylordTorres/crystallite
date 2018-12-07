import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  AppRegistry,
  processColor,
  LayoutAnimation
} from "react-native";
import {
  Button,
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Icon,
  Card,
  CardItem,
  List,
  ListItem
} from "native-base";
import update from "immutability-helper";

import { LineChart } from "react-native-charts-wrapper";
import LineChartScreen from "./charts/LineChartScreen";

const screenWidth = Dimensions.get("window").width;

export default class ChildrenDashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LineChartScreen />
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
      //           this.props.navigation.goBack();
      //         }}
      //       >
      //         <Icon name="ios-arrow-back" />
      //       </Button>
      //     </Left>
      //     <Body>
      //       <Title>Children DashBoard</Title>
      //     </Body>
      //     <Right>
      //       <Button
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
      //       </Button>
      //     </Right>
      //   </Header>
      //   <Content>

      //     {/* LIST VIEW */}
      //     <List style={{ flex: 1 }}>
      //       <ListItem>
      //         <View
      //           style={{ backgroundColor: "#4285f4", flex: 1, padding: 10 }}
      //         >
      //           <Text style={{ color: "white" }}>
      //             Lorem Ipsum is simply dummy text of the printing and
      //             typesetting industry. Lorem Ipsum has been the industry's
      //             standard dummy text ever since the 1500s, when an unknown
      //             printer took a galley of type and scrambled it to make a type
      //             specimen book. It has survived not only five centuries, but
      //             also the leap into electronic typesetting, remaining
      //             essentially unchanged. It was popularised in the 1960s with
      //             the release of Letraset sheets containing Lorem Ipsum
      //             passages, and more recently with desktop publishing software
      //             like Aldus PageMaker including versions of Lorem Ipsum.
      //           </Text>
      //         </View>
      //       </ListItem>
      //       <ListItem>
      //         <View
      //           style={{ backgroundColor: "#34a853", flex: 1, padding: 10 }}
      //         >
      //           <Text style={{ color: "white" }}>
      //             Lorem Ipsum is simply dummy text of the printing and
      //             typesetting industry. Lorem Ipsum has been the industry's
      //             standard dummy text ever since the 1500s, when an unknown
      //             printer took a galley of type and scrambled it to make a type
      //             specimen book. It has survived not only five centuries, but
      //             also the leap into electronic typesetting, remaining
      //             essentially unchanged. It was popularised in the 1960s with
      //             the release of Letraset sheets containing Lorem Ipsum
      //             passages, and more recently with desktop publishing software
      //             like Aldus PageMaker including versions of Lorem Ipsum.
      //           </Text>
      //         </View>
      //       </ListItem>
      //       <ListItem>
      //         <View
      //           style={{ backgroundColor: "#fbbc05", flex: 1, padding: 10 }}
      //         >
      //           <Text style={{ color: "white" }}>
      //             Lorem Ipsum is simply dummy text of the printing and
      //             typesetting industry. Lorem Ipsum has been the industry's
      //             standard dummy text ever since the 1500s, when an unknown
      //             printer took a galley of type and scrambled it to make a type
      //             specimen book. It has survived not only five centuries, but
      //             also the leap into electronic typesetting, remaining
      //             essentially unchanged. It was popularised in the 1960s with
      //             the release of Letraset sheets containing Lorem Ipsum
      //             passages, and more recently with desktop publishing software
      //             like Aldus PageMaker including versions of Lorem Ipsum.
      //           </Text>
      //         </View>
      //       </ListItem>
      //       <ListItem>
      //         <View
      //           style={{ backgroundColor: "#ea4335", flex: 1, padding: 10 }}
      //         >
      //           <Text style={{ color: "white" }}>
      //             Lorem Ipsum is simply dummy text of the printing and
      //             typesetting industry. Lorem Ipsum has been the industry's
      //             standard dummy text ever since the 1500s, when an unknown
      //             printer took a galley of type and scrambled it to make a type
      //             specimen book. It has survived not only five centuries, but
      //             also the leap into electronic typesetting, remaining
      //             essentially unchanged. It was popularised in the 1960s with
      //             the release of Letraset sheets containing Lorem Ipsum
      //             passages, and more recently with desktop publishing software
      //             like Aldus PageMaker including versions of Lorem Ipsum.
      //           </Text>
      //         </View>
      //       </ListItem>
      //     </List>
      //   </Content>
      // </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#F5FCFF"
  }
});
