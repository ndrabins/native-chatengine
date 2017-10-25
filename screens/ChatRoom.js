import React from "react";
import { StyleSheet, Text, View, Image, KeyboardAvoidingView} from "react-native";

import typingIndicator from "chat-engine-typing-indicator";

import MessageEntry from "../components/MessageEntry";
import MessageList from "../components/MessageList";

export default class ChatRoom extends React.Component {
  static navigationOptions = {
    drawerLabel: "ChatRoom"
  };

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
    console.log("in chatroom");
    const chatEngine = this.props.screenProps.chatEngine;
    let chat = new chatEngine.Chat("Main", true);
    // chat.plugin(typingIndicator({ timeout: 5000 }));
    console.log(this.state);
    this.setState({
      chat: chat,
      renderChat: true,
      me: chatEngine.me,
      globalChat: chatEngine.global
    });
  }

  componentWillUpdate(){
    console.log("updating");
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.renderChat ? (
          <View style={{flex:1,width:"100%", marginTop:-80}}>
            <MessageList chat={this.state.chat} me={this.state.me}/>
            <MessageEntry chat={this.state.chat} />
          </View>
        ) : (
          <Text>
          loading
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
