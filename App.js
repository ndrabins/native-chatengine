import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

import ChatEngineCore from "chat-engine";
import ChatEngineGravatar from "chat-engine-gravatar";
import ChatEngineMarkdown from "chat-engine-markdown";
// import typingIndicator from "chat-engine-typing-indicator";

import MessageEntry from "./components/MessageEntry";
import MessageList from "./components/MessageList";
import UserList from "./components/UserList";

// import {MessageEntry} from "chat-engine-react-native";
// import {MessageList} from "chat-engine-react-native";
// import {UserList} from "chat-engine-react-native";

const ChatEngine = ChatEngineCore.create({
  publishKey: "pub-c-0fb6e2c9-c3fa-4dbc-9c8d-86a3813c73c8",
  subscribeKey: "sub-c-e3f6d3fe-934e-11e7-a7b2-42d877d8495e"
}, {
  endpoint: 'http://localhost:3000/insecure',
  globalChannel: 'chat-engine-global-channel',
});

const now = new Date().getTime();
const username = ["user", now].join("-");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      renderChat: false,
      me: null,
      globalChat: null
    };
  }

  componentDidMount() {
    //chatengine throws some warning about timing that is a part of the library itself
    console.disableYellowBox = true;

    ChatEngine.connect(username, {
      signedOnTime: now
    }, 'auth-key');
  

    ChatEngine.on("$.ready", data => {
      console.log("chatengine ready");
      const me = data.me;

      me.plugin(ChatEngineGravatar());

      console.log("Chat Engine ready");

      let chat = new ChatEngine.Chat("completelyNew");
      // chat.plugin(typingIndicator({ timeout: 5000 }));

      this.setState({ chat: chat, renderChat: true, me: data.me, globalChat: ChatEngine.global});

      // ChatEngine.global.on("message", payload => {
      //   console.log(payload);
      // });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.renderChat ? (
          <View style={styles.loading}>
            <Text> Loading... </Text>
          </View> 
        ) : (
          <View style={{ flex: 1 }}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {Platform.OS === "android" && (
              <View style={styles.statusBarUnderlay} />
            )}
            <MessageList chat={this.state.chat} me={this.state.me}/>    
            <MessageEntry chat={this.state.chat} />
            {/* <UserList chat={this.state.globalChat} /> */}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
