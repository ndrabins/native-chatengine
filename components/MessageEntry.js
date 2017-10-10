import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { Icon } from 'react-native-elements';

class MessageEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: "",
    };

    this.setChatInput = this.setChatInput.bind(this);
  }

  sendChat() {
    if (this.state.chatInput) {
      this.props.chat.emit('message', {
        text: this.state.chatInput
      });
      this.setState({ chatInput: "" });
    }
  }

  setChatInput(value) {
    this.setState({ chatInput: value });

    if(value !== ""){
      // this.props.chat.typingIndicator.startTyping();
    }else{
      // this.props.chat.typingIndicator.stopTyping();
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
          {/* <NameTypingIndicator chat={this.props.chat} /> */}
          <View style={styles.footer}>
            <TextInput
              value={this.state.chatInput}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Send Message staaahp"
              onChangeText={this.setChatInput}
            />
            <TouchableOpacity style={{backgroundColor:'#D02129'}}>
              <Icon
                reverse
                name="send"
                size={26}
                color="#D02129"
                style={styles.send} 
                onPress={() => {
                  this.sendChat();
                }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    padding: 10,
  },
});

export default MessageEntry;