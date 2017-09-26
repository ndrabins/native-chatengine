import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

import ChatEngineCore from "chat-engine";
import ChatEngineGravatar from 'chat-engine-gravatar'

import MessageEntry from './components/MessageEntry';
import MessageList from './components/MessageList';

const ChatEngine = ChatEngineCore.create({
  publishKey: "pub-c-0fb6e2c9-c3fa-4dbc-9c8d-86a3813c73c8",
  subscribeKey: "sub-c-e3f6d3fe-934e-11e7-a7b2-42d877d8495e"
});

const now = new Date().getTime();
const username = ['user', now].join('-');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      renderChat: false,
      me: null, 
    };
  }

  componentDidMount() {
    //chatengine throws some warning about timing that is a part of the library itself
    console.disableYellowBox = true;

    ChatEngine.connect("user-1506449048908", {
      // email: new Date()
    });

    ChatEngine.on("$.ready", data => {
      const me = data.me;

      console.log(me);

      me.plugin(ChatEngineGravatar());

      console.log("Chat Engine ready");

      let chat = new ChatEngine.Chat('test10');

      this.setState({chat: chat, renderChat: true, me: data.me});

      // ChatEngine.global.on("message", payload => {
      //   console.log(payload);
      // });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.renderChat ? (
          <Text> Loading </Text>  
        ) : (
          <View style={{flex:1}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <MessageList chat={this.state.chat} me={this.state.me}/>      
            <MessageEntry chat={this.state.chat}/>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
