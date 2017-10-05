import React, { Component } from 'react';
import { Header,Text, Avatar, List, ListItem } from "react-native-elements";
import { StyleSheet, View, ScrollView } from "react-native";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: []
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
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}> Online Users </Text>
        </View>
        <ScrollView>
          <List>
            {
              this.state.userList.map((user, index) => (
                <ListItem
                  avatar={<Avatar
                    rounded
                    source={user.avatar_url && {uri: user.avatar_url}}
                    title={user.name[0]}
                  />}
                  key={index}
                  title={user.name}
                  hideChevron
                />
              ))
            }
          </List>
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
  }
});

export default UserList;