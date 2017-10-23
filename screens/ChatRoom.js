import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MessageEntry from '../components/MessageEntry';
import MessageList from '../components/MessageList';

export default class ChatRoom extends React.Component {
  static navigationOptions = {
    drawerLabel: 'ChatRoom',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>MessageList</Text>
        <Text>MessageEntry</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})