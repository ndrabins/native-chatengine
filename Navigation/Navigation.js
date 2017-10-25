import React from "react";
import { Text, Animated, Easing, View, TouchableOpacity } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import ChatRoom from "../screens/ChatRoom";
import Screen2 from "../screens/Screen2";
import DrawerContainer from "./DrawerContainer";

import { Ionicons } from "@expo/vector-icons";

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

// drawer stack
const DrawerStack = DrawerNavigator(
  {
    ChatRoom: { screen: ChatRoom },
    screen2: { screen: Screen2 }
  },
  {
    gesturesEnabled: true,
    contentComponent: props => <DrawerContainer {...props} />
  }
);

const drawerButton = navigation => (
  <TouchableOpacity
    hitSlop={{ top: 10, bottom: 10, left: 20, right: 20}}
    style={{ marginLeft: 10 }}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate("DrawerOpen");
      } else {
        navigation.navigate("DrawerClose");
      }
    }}
  >
    <Ionicons name="ios-menu" size={32} color="white" />
  </TouchableOpacity>
);

const DrawerNavigation = StackNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#cb2d3e" },
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerRight: <View />,
      title: "Main",
      headerTintColor: "white",
      gesturesEnabled: false,
      headerLeft: drawerButton(navigation)
    })
  }
);

export default DrawerNavigation;
