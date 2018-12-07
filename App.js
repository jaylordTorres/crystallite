import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  DrawerItems
} from "react-navigation";
import Icon from "react-native-vector-icons/Feather";

// import the different screens
import Loading from "./screens/Loading";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Main from "./screens/Main";
import Dashboard from "./screens/DashBoard";
import SettingScreen from "./screens/SettingScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import MarkedAttendance from "./screens/Attendance/MarkedAttendance";
import UnmarkedAttendance from "./screens/Attendance/UnmarkedAttendance";
import ChildrenDashboard from "./screens/ChildrenDashboard";

const { width } = Dimensions.get("window");
// create our app's navigation stack
// const App = createSwitchNavigator(
//   {
//     Loading,
//     SignUp,
//     Login,
//     Main
//   },
//   {
//     initialRouteName: "Loading"
//   }
// );
// export default App;
const AuthStackNavigator = createSwitchNavigator({
  Login: Login,
  SignUp: SignUp
});

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: () => <Icon name="home" size={24} />
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: "DashBoard",
      tabBarIcon: () => <Icon name="grid" size={24} />
    }
  },
  Settings: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: () => <Icon name="settings" size={24} />
    }
  }
});

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      // title: "Your App",
      // headerStyle: {
      //   backgroundColor: "#f15922",
      //   color: "white"
      // },
      // headerLeft: (
      //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      //     <View style={{ paddingHorizontal: 10 }}>
      //       <Icon name="align-justify" size={24} />
      //     </View>
      //   </TouchableOpacity>
      // )
      header: null
    })
  },
  ChildrenDashboard: {
    screen: ChildrenDashboard,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

// AppTabNavigator.navigationOptions = ({ navigation }) => {
//   let { routeName } = navigation.state.routes[navigation.state.index];

//   // You can do whatever you like here to pick the title based on the route name
//   let headerTitle = "My App";

//   return {
//     headerTitle
//   };
// };

const CustomDrawerComponent = props => (
  <View style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "#f15922",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        source={require("./images/userImage.png")}
        style={{ height: 120, width: 120, borderRadius: 60 }}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
);

const AttendanceTabNavigator = createMaterialTopTabNavigator(
  {
    Marked: {
      screen: MarkedAttendance,
      navigationOptions: {
        tabBarLabel: "Marked",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bell" color={tintColor} size={24} />
        )
      }
    },
    UnMarked: {
      screen: UnmarkedAttendance,
      navigationOptions: {
        tabBarLabel: "Unmarked",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bell-off" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Marked",
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "#e4e4e4",
      style: {
        backgroundColor: "#f15922"
      }
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppStackNavigator,
    Attendance: { screen: AttendanceTabNavigator }
  },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: width,
    contentOptions: {
      activeTintColor: "#f15922"
    }
  }
);

export default createSwitchNavigator({
  AuthLoading: Loading,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});
