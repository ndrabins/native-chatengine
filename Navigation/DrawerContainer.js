import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import { NavigationActions } from 'react-navigation'

import ChatList from '../components/ChatList';
import UserList from '../components/UserList';

const chatList = [
  {
    name: "Main",
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
    subtitle: "Motivation everyday",
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
    console.log(this.props);
  }

  render() {
    const chatEngine = this.props.screenProps.chatEngine;
    console.log(chatEngine);
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        {/* <Text
          onPress={() => navigation.navigate('ChatRoom')}
          style={styles.DrawerItem}>
          Chatroom
        </Text> */}
        <ChatList chatList={chatList} />
        <Text> Direct Messages </Text>
        <View style={{ borderBottomWidth:2,borderBottomColor: "#BDBDBD"}} />
        <UserList chat={chatEngine.global} />
        {/* <Text
          onPress={() => navigation.navigate('screen2')}
          style={styles.DrawerItem}>
          Screen 2
        </Text> */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  DrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    marginHorizontal: 15,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})