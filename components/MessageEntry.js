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
  }

  sendChat() { 
    this.props.chat.emit('message', {
      text: this.state.chatInput
    });
    this.setState({ chatInput: "" });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.chatInput}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Send Message"
              onChangeText={text => this.setState({chatInput: text})}
            />
            <TouchableOpacity>
              <Icon
                name="send"
                size={26}
                color="#20b2aa"
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