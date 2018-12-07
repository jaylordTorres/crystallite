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
import Video from "react-native-video";
export default class SettingScreen extends Component {
  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: "#f15922" }}
          androidStatusBarColor="#f15922"
        >
          {/* <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            >
              <Icon name="menu" />
            </Button>
          </Left> */}
          <Body>
            <Title>Stream Video</Title>
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
          <Text>Stream Video</Text>
          <Video
            source={{ uri: "https://www.youtube.com/watch?v=JPT3bFIwJYA" }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
