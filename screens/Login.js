import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
import firebase from "react-native-firebase";
import bgImage from "../images/bg.jpg";
import Logo from "../images/logo.png";
import Icon from "react-native-vector-icons/FontAwesome";

const { width: WIDTH } = Dimensions.get("window");

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    showPass: true,
    press: false
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  showPassword = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.BgContainer}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.Logo} />
          <Text style={styles.logoText}>Login</Text>
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
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
            keyboardType="email-address"
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
        <TouchableOpacity style={styles.btnLogin}>
          <Text onPress={this.handleLogin} style={styles.text}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Text style={styles.textLink}>
            Don't Have an Account? Signup Here
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      // <View style={styles.container}>
      //   <Text>Login</Text>
      //   {this.state.errorMessage && (
      //     <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
      //   )}
      //   <TextInput
      //     style={styles.textInput}
      //     autoCapitalize="none"
      //     placeholder="Email"
      //     onChangeText={email => this.setState({ email })}
      //     value={this.state.email}
      //   />
      //   <TextInput
      //     secureTextEntry
      //     style={styles.textInput}
      //     autoCapitalize="none"
      //     placeholder="Password"
      //     onChangeText={password => this.setState({ password })}
      //     value={this.state.password}
      //   />
      //   <Button title="Login" onPress={this.handleLogin} />
      //   <Button
      //     title="Don't have an account? Sign Up"
      //     onPress={() => this.props.navigation.navigate("SignUp")}
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
    marginBottom: 50
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
