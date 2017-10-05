import React, { Component } from 'react';
import { Header,Text, Avatar, List, ListItem } from "react-native-elements";
import { StyleSheet, View, ScrollView } from "react-native";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
    };
  }


  componentDidMount(){
    this.props.chat.on('$.online.*', (newUser) => {
      let user = {
        name: newUser.user.uuid,
        avatar_url : 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png',
      }
      this.setState({ userList: [...this.state.userList, user] });
    });

    this.props.chat.on('$.offline.*', (data) => {
        console.log('User disconnected from the network:', data.user.uuid);
    });
  }

  renderOnlineList(){
    return this.state.userList.map((user, index) => (
      <View
        key={index}
        style={styles.ListItem}
      >
        <Avatar
          containerStyle={styles.avatar}
          rounded
          source={user.avatar_url && {uri: user.avatar_url}}
          title={user.name[0]}
        />
        <View style={styles.online}/>
        <Text style={styles.username}>{user.name}</Text>
      </View>
    ))
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}> Users </Text>
        </View>
        <ScrollView style={styles.list}>
            { this.renderOnlineList() }
        </ScrollView>
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
  list:{
    borderBottomWidth: 1,
    borderColor: '#d6d7da',
  },
  ListItem:{
    flexDirection:"row",
    borderTopWidth: 1,
    borderColor: '#d6d7da',
    height: 50,
    alignItems:"center",
  },
  avatar:{
    marginLeft: 10,
  },
  username:{
    marginLeft: 5,
  },
  online:{
    backgroundColor:"green",
    width:10,
    height:10,
    borderRadius:5,
    position: 'absolute',
    bottom: 8,
    left: 35,
  },
  offline:{
    backgroundColor:"#95a5a6",
    width:10,
    height:10,
    borderRadius:5,
    position: 'absolute',
    bottom: 8,
    left: 35,
  }
});

export default UserList;