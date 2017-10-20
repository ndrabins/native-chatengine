//be me.session
// me.session.chats 

import React, { Component } from 'react';
import { Header,Text, Avatar, List, ListItem } from "react-native-elements";
import { StyleSheet, View, ScrollView, TouchableOpacity} from "react-native";

class ChatList extends Component {
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}> Chat </Text>
        </View>
        <List containerStyle={{marginBottom: 20, marginTop:0 }}>
          {
            this.props.chatList.map((chat, index) => (
            <TouchableOpacity key={index}>
              <ListItem
                key={index}
                title={chat.name}
                subtitle={chat.subtitle}
                badge={{ value: chat.unread, textStyle: { color: 'white' }, containerStyle: {backgroundColor: '#E14A52', marginTop: 5 } }}
              />
            </TouchableOpacity>
            ))
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    height:40,
    alignItems: 'center',
    backgroundColor: "#D02129"
  },
  headerText:{
    color:"#fff"
  },
});



export default ChatList;