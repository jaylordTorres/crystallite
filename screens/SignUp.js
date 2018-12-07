import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  AsyncStorage,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";

import firebase from "react-native-firebase";
import bgImage from "../images/bg.jpg";
import Logo from "../images/logo.png";
import Icon from "react-native-vector-icons/FontAwesome";
// import DatePicker from "react-native-datepicker";

const { width: WIDTH } = Dimensions.get("window");

export default class SignUp extends Component {
  state = {
    username: "",
    age: "",
    email: "",
    password: "",
    token: "",
    errorMessage: null,
    date: "2016-05-15"
  };

  // async componentDidMount() {
  //   this.checkPermission();
  //   this.refreshToken()
  // }

  // refreshToken = () => {
  //   firebase.iid().delete(token => {
  //     console.log('token deleted')
  //   })
  // }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        let account = {};
        account.email = this.state.email.toLowerCase();
        account.uid = res.user.uid;
        account.username = this.state.username;
        account.age = this.state.age;
        // account.token = this.state.token

        firebase
          .database()
          .ref("users/" + res.user.uid)
          .set(account)
          .then(() => console.log(account.uid));
        console.log(res);
        this.props.navigation.navigate("Main");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  showPassword = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  //1
  // async checkPermission() {
  //   firebase
  //     .messaging()
  //     .hasPermission()
  //     .then(enabled => {
  //       if (enabled) {
  //         // user has permissions
  //         console.log("Permission granted");
  //         this.getToken();
  //       } else {
  //         // user doesn't have permission
  //         console.log("Permission request");
  //         this.requestPermission();
  //       }
  //     });

  // }

  // //3
  // async getToken() {
  //   let fcmToken = await AsyncStorage.getItem("fcmToken");
  //   console.log("before fcmtoken", fcmToken);
  //   // console.warn(fcmToken);
  //   this.setState({
  //     token: fcmToken
  //   })

  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       // user has a device token
  //       await AsyncStorage.setItem("fcmToken", fcmToken);
  //       console.log("after fcmtoken", fcmToken);
  //     }
  //   }
  // }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.BgContainer}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.Logo} />
          <Text style={styles.logoText}>Sign up</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name={"user"}
            size={28}
            color={"rgba(0,0,0,0.7)"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"UserName"}
            placeholderTextColor={"rgba(0,0,0,0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={"envelope"}
            size={28}
            color={"rgba(0,0,0,0.7)"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            placeholderTextColor={"rgba(0,0,0,0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={"lock"}
            size={28}
            color={"rgba(0,0,0,0.7)"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={"rgba(0,0,0,0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPassword.bind(this)}
          >
            <Icon
              name={this.state.press == false ? "eye" : "eye-slash"}
              size={26}
              color={"rgba(0,0,0,0.7)"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name={"birthday-cake"}
            size={28}
            color={"rgba(0,0,0,0.7)"}
            style={styles.inputIcon}
          />
          {/* <DatePicker
            style={styles.input}
            date={this.state.date}
            mode="date"
            placeholder="Date Of Birth"
            format="YYYY-MM-DD"
            minDate="1990-05-01"
            maxDate="2018-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.setState({ date: date });
            }}
          /> */}
          <TextInput
            style={styles.input}
            placeholder={"Age"}
            placeholderTextColor={"rgba(0,0,0,0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={age => this.setState({ age })}
            value={this.state.age}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.btnLogin}>
          <Text onPress={this.handleSignUp} style={styles.text}>
            SignUp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.textLink}>
            Already Have an Account? Login Here
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      // <View style={styles.container}>
      //   <Text>Sign Up</Text>
      //   {this.state.errorMessage && (
      //     <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
      //   )}
      //   <TextInput
      //     placeholder="Username"
      //     autoCapitalize="none"
      //     style={styles.textInput}
      //     onChangeText={username => this.setState({ username })}
      //     value={this.state.username}
      //   />
      //   <TextInput
      //     placeholder="Age"
      //     autoCapitalize="none"
      //     style={styles.textInput}
      //     onChangeText={age => this.setState({ age })}
      //     value={this.state.age}
      //   />
      //   <TextInput
      //     placeholder="Email"
      //     autoCapitalize="none"
      //     style={styles.textInput}
      //     onChangeText={email => this.setState({ email })}
      //     value={this.state.email}
      //   />
      //   <TextInput
      //     secureTextEntry
      //     placeholder="Password"
      //     autoCapitalize="none"
      //     style={styles.textInput}
      //     onChangeText={password => this.setState({ password })}
      //     value={this.state.password}
      //   />
      //   <Button transparent title="Sign Up" onPress={this.handleSignUp} />
      //   <Button
      //     transparent
      //     title="Already have an account? Login"
      //     onPress={() => this.props.navigation.navigate("Login")}
      //   />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  BgContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10
  },
  Logo: {
    width: 250,
    height: 80,
    resizeMode: "contain"
  },
  logoText: {
    color: "#000000",
    fontSize: 30,
    marginTop: 10,
    opacity: 0.5
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 0,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "rgba(12, 77, 162, 0.7)",
    marginHorizontal: 25,
    borderColor: "rgba(0,0,0,0.7)",
    borderWidth: 1
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37
  },
  btnEye: {
    position: "absolute",
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 0,
    backgroundColor: "#f15922",
    justifyContent: "center",
    marginTop: 50
  },
  textLink: {
    color: "rgba(12, 77, 162, 0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  text: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    textAlign: "center"
  }
});
