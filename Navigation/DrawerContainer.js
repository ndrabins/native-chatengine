import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import { NavigationActions } from 'react-navigation'

import ChatList from '../components/ChatList';
import UserList from '../components/UserList';

const chatList = [
  {
    name: "General",
    subtitle: "General Chat",
    unread: 5
  },
  {
    name: "Foolery",
    subtitle: "Come for the people, stay for the gifs",
    unread: 2
  },
  {
    name: "Support",
    subtitle: "Get help here",
    unread: 0
  },
  {
    name: "Docs",
    subtitle: "Keep track of all our ish",
    unread: 0
  },
  {
    name: "Design",
    subtitle: "Make things look great",
    unread: 3
  },
  {
    name: "Standups",
    subtitle: "Agile like a cat",
    unread: 7
  },
  {
    name: "Inspiration",
    subtitle: "Motivation monday everyday",
    unread: 0
  },
  {
    name: "Development",
    subtitle: "Creating awesome stuff",
    unread: 4
  },
];
export default class DrawerContainer extends React.Component {
  componentDidMount(){
    console.log(this.props.navigation);
  }

  onChatPress = (chat) =>{
    console.log("Navigating to chat");
    console.log(chat);
    this.props.navigation.navigate('ChatRoom', {title: chat.name});
    // this.props.navigation.setParams({title: chat.name});
    console.log(this.props.navigation);
  }

  render() {
    const chatEngine = this.props.screenProps.chatEngine;
    // console.log(chatEngine);
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        <ChatList chatList={chatList} onChatPress={this.onChatPress} />
        <Text> Direct Messages </Text>
        <View style={{ borderBottomWidth:2,borderBottomColor: "#BDBDBD"}} />
        <UserList chat={chatEngine.global} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
})