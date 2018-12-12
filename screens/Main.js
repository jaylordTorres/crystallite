import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  AppState
} from "react-native";
import {
  List,
  ListItem,
  Switch,
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
import FlashMessage, {
  showMessage,
  hideMessage
} from "react-native-flash-message";
import firebase from "react-native-firebase";
import BackgroundTimer from "react-native-background-timer";
import moment from "moment";
import axios from "axios";
import AntIcons from "react-native-vector-icons/AntDesign";
// import switch_example from "./switch/switch_example";

const CurrentDate = moment(Date().now).format("YYYY-MM-DD");
const currentTime = moment("2018-11-20 23:00 ").format("HH:mm:ss");
const currentTimeX = moment(Date().now).format("x");
console.log(currentTimeX);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      token: "",
      deviceData: [],
      serverTime: "",
      currentTime: "",
      firebaseUser: {},
      appState: AppState.currentState,
      allowNotification: "",
      checkNotification: true,
      switch1Value: false
    };
  }

  async componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.checkPermission();
    this.createNotificationListeners();

    firebase
      .database()
      .ref(`/users/${currentUser.uid}`)
      .on("value", snapshot => {
        console.log("snaphsot", snapshot);
        this.setState({ firebaseUser: snapshot.val() });
      });

    console.log("firebase =====" + this.state.firebaseUser.uid);
    AppState.addEventListener("change", this._handleAppStateChange);

    console.log("component Did mount");

    // this.fetchDataAPI();
  }

  fetchDataAPI = () => {
    if (this.state.switch1Value == false) {
      console.log("Notifications ALLOWED");
      BackgroundTimer.runBackgroundTimer(() => {
        axios
          .get(`http://173.82.185.123:1111/device_pulse/bitspulsejson`)
          .then(res => {
            const deviceData = res.data["device_data"];

            const serverDate = moment(
              deviceData["OPK6100056093000004"].last_active
            ).format("YYYY-MM-DD");
            const serverTime = moment(
              deviceData["OPK6100056093000004"].last_active
            ).format("HH:mm:ss");
            console.log(
              "Server Date " + serverDate + " Server Time " + serverTime
            );

            console.log(currentTime);
            const server = serverDate + " " + serverTime;
            // const current = CurreentDate + " " + currentTime;
            const current = CurrentDate + " " + currentTime;
            console.log(
              "Current Date " + CurrentDate + " Current Time " + currentTime
            );

            this.setState({
              deviceData: deviceData,
              serverTime: server,
              currentTime: current
            });

            var endTime = current;
            var NotifyList = [];
            var htmlDummy = "";
            console.log("CurrentDate", CurrentDate);
            var serverLastActive = moment(last_active_time).format(
              "YYYY/MM/DD"
            );
            console.log(
              "fixedTime",
              moment(JSON.stringify(CurrentDate) + "02:00").format("x")
            );
            var fixedTime = moment(
              JSON.stringify(CurrentDate) + "02:00"
            ).format("x");
            console.log(currentTimeX, fixedTime, currentTimeX >= fixedTime);
            if (currentTimeX >= fixedTime) {
              var device_count = 0;
              for (key in deviceData) {
                var last_active_time = deviceData[key].last_active;

                if (last_active_time != "None") {
                  var startTime = moment(last_active_time).format(
                    "YYYY/MM/DD HH:mm"
                  );
                  var device_active_date = moment(last_active_time).format(
                    "YYYY-MM-DD"
                  );
                  var hours = moment
                    .duration(
                      moment(endTime, "YYYY/MM/DD HH:mm").diff(
                        moment(startTime, "YYYY/MM/DD HH:mm")
                      )
                    )
                    .asHours();
                  console.log("hours", hours);
                  if (CurrentDate == device_active_date) {
                    if (hours > 2 && hours < 11) {
                      NotifyList.push(key);
                      htmlDummy +=
                        key +
                        ": " +
                        "LastActive: " +
                        last_active_time +
                        " Difference : " +
                        hours +
                        "\n \n";
                      device_count++;
                    }
                  }
                }
              }
              console.log("device_count", device_count);
              if (NotifyList) {
                axios.post(
                  "https://fcm.googleapis.com/fcm/send",
                  {
                    to:
                      // "fHR-yO9ZhaE:APA91bEL3BwxHpWQyFZNtpwC0NoeqT5E4LeBklSDRp8uMSG40WxMkrtjcULO6Ug4tsH6o9pMo1lk_slWTga5j4u5SJimSwEppTc7vre5CEK6yRV8vwHx8n8hSkEdZHmnUkcjp1Txjj0b",
                      `${this.state.token}`,
                    notification: {
                      body: htmlDummy,
                      title: "Device Notification",
                      content_available: true,
                      priority: "high",
                      show_in_foreground: true,
                      sound: "default",
                      vibrate: 500,
                      badge: 2
                    },
                    data: {
                      body:
                        "Great match! Between Portugal and Denmark, Portugal won a Thriller 3-0",
                      title: "Device Notification",
                      content_available: true,
                      priority: "high",
                      show_in_foreground: true,
                      sound: "default",
                      vibrate: 500,
                      badge: 2
                    }
                  },
                  {
                    headers: {
                      Authorization:
                        "key=AIzaSyC9SBmq1usSZgPWKT4pdFg_2S13FfzOBOc",
                      "Content-Type": "application/json"
                    }
                  }
                );

                // console.log(
                //   `${hours} 2 Hours plus Difference Notification Dispatched`
                // );
              }
            } else {
              console.log("Hours Difference less than 2 " + hours);
              axios.post(
                "https://fcm.googleapis.com/fcm/send",
                {
                  to:
                    // "fHR-yO9ZhaE:APA91bEL3BwxHpWQyFZNtpwC0NoeqT5E4LeBklSDRp8uMSG40WxMkrtjcULO6Ug4tsH6o9pMo1lk_slWTga5j4u5SJimSwEppTc7vre5CEK6yRV8vwHx8n8hSkEdZHmnUkcjp1Txjj0b",
                    `${this.state.firebaseUser.token}`,
                  notification: {
                    body: "No Time",
                    title: "Portugal vs. Denmark",
                    content_available: true,
                    priority: "high",
                    show_in_foreground: true,
                    sound: "default",
                    vibrate: 500,
                    badge: 2
                  },
                  data: {
                    body: "No Time",
                    title: "Portugal vs. Denmark",
                    content_available: true,
                    priority: "high",
                    show_in_foreground: true,
                    sound: "default",
                    vibrate: 500,
                    badge: 2
                  }
                },
                {
                  headers: {
                    Authorization:
                      "key=AIzaSyC9SBmq1usSZgPWKT4pdFg_2S13FfzOBOc",
                    "Content-Type": "application/json"
                  }
                }
              );
            }

            // const currentLastActive = moment(Date().now).format("HH:mm");

            // var endTime = current;
          });
      }, 10000);
    } else {
      console.log("Notifications Disabled");

      BackgroundTimer.stopBackgroundTimer();
    }
  };

  //1
  async checkPermission() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          console.log("Permission granted");
          this.getToken();
        } else {
          // user doesn't have permission
          console.log("Permission request");
          this.requestPermission();
        }
      });

    // const enabled = await firebase.messaging().hasPermission();
    // if (enabled) {
    //   this.getToken();
    // } else {
    //   this.requestPermission();
    // }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log("before fcmtoken", fcmToken);
    // console.warn(fcmToken);
    this.setState({
      token: fcmToken
    });
    console.log("firebase :" + this.state.firebaseUser.token);

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
        console.log("after fcmtoken", fcmToken);
        this.setState({
          token: fcmToken
        });
      }
    }
  }

  //2
  async requestPermission() {
    // try {
    //   await firebase.messaging().requestPermission();
    //   // User has authorised
    //   this.getToken();
    // } catch (error) {
    //   // User has rejected permissions
    //   console.log("permission rejected");
    // }

    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        // User has authorised
        console.log("Permission granted in requestPermission");
        this.getToken();
      })
      .catch(error => {
        // User has rejected permissions
        console.log("permission rejected");
      });
  }

  ////////////////////// Add these methods //////////////////////

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();

    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify("message", message));
    });
  }

  // static navigationOptions = ({ navigation }) => ({
  //   headerRight: (
  //     <Button
  //       primary
  //       title="Logout"
  //       onPress={() => {
  //         firebase
  //           .auth()
  //           .signOut()
  //           .then(
  //             () => {
  //               navigation.navigate("Login");
  //             },
  //             function(error) {
  //               // An error happened.
  //             }
  //           );
  //       }}
  //     >
  //       Log out
  //     </Button>
  //   )
  // });
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    this.setState({ appState: nextAppState });
  };

  toggleAllow = value => {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .update({ allowNotification: value });
    this.setState({ allowNotification: value });

    console.log("Switch 1 is: " + value);
  };

  toggleSwitch1 = value => {
    this.fetchDataAPI();
    this.setState({ switch1Value: value });
    console.log("Switch 1 is: " + value);
  };

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    const { currentUser } = this.state;
    const currentUserUID = currentUser && currentUser.uid;
    // const fetchUser = firebase.database().ref('users/' + currentUserUID + '/account');
    firebase
      .database()
      .ref("users/" + currentUserUID)
      .update({ token: this.state.token });

    let startTime = this.state.serverTime;
    let endTime = this.state.currentTime;
    let hours = moment
      .duration(
        moment(endTime, "YYYY/MM/DD HH:mm").diff(
          moment(startTime, "YYYY/MM/DD HH:mm")
        )
      )
      .asHours();

    return (
      // <View style={styles.container}>
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
            <Title>Home</Title>
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
          {/* for firebase */}
          {/* <Switch
          onValueChange={this.toggleAllow}
          value={this.state.firebaseUser.allowNotification}
        />  */}
          <List>
            <ListItem style={styles.listItems}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ChildrenDashboard");
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  height: 120,
                  backgroundColor: "#fff",
                  borderRadius: 100
                }}
              >
                <AntIcons name="user" size={30} color="#01a699" />
                <Text>Student 1</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem style={styles.listItems}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ChildrenDashboard");
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  height: 120,
                  backgroundColor: "#fff",
                  borderRadius: 100
                }}
              >
                <AntIcons name="user" size={30} color="#01a699" />
                <Text>Student 1</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem style={styles.listItems}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ChildrenDashboard");
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  height: 120,
                  backgroundColor: "#fff",
                  borderRadius: 100
                }}
              >
                <AntIcons name="user" size={30} color="#01a699" />
                <Text>Student 1</Text>
              </TouchableOpacity>
            </ListItem>
          </List>
          <Text>{`Notifications Allow : ${this.state.switch1Value}`}</Text>
          {console.log(this.state.switch1Value)}
          <Switch
            onValueChange={this.toggleSwitch1}
            value={this.state.switch1Value}
          />
          {/* <SwitchExample
            toggleSwitch1={this.toggleSwitch1}
            switch1Value={this.state.switch1Value}
          /> */}
          <FlashMessage position="top" />
        </Content>
      </Container>

      // </View>
    );
  }

  showAlert(title, body) {
    // Alert.alert(
    //   title, body,
    //   [
    //       { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ],
    //   { cancelable: false },
    // );

    showMessage({
      message: body ? body : "No Device is off in between 2 and 9 hours",
      description: title,
      type: "success",
      icon: "success",
      duration: 2000,
      floating: false,
      hideStatusBar: false
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listItems: {
    justifyContent: "center",
    alignItems: "center"
  }
});
