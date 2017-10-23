import React, { Component } from 'react';
import { Text, View, } from "react-native";
import Navigation from '../Navigation/Navigation';
// import MessageEntry from "../components/MessageEntry";
// import MessageList from "../components/MessageList";

class Chat extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Navigation />
      </View>
    );
  }
}

export default Chat;
