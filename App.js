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

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      renderChat: false,
    };
  }

  componentDidMount() {
    //chatengine throws some warning about timing that is a part of the library itself
    console.disableYellowBox = true;

    ChatEngine.connect("bob", {
      // email: new Date()
    });

    ChatEngine.on("$.ready", data => {
      const me = data.me;

      me.plugin(ChatEngineGravatar());

      console.log("Chat Engine ready");

      let chat = new ChatEngine.Chat('tutorial-chat');

      this.setState({chat: chat, renderChat: true});

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
            <MessageList chat={this.state.chat}/>      
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
