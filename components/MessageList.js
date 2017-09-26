import React, { Component } from "react";
import { Header, Text, Avatar } from "react-native-elements";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";

import ChatEngineGravatar from "chat-engine-gravatar";

import HTMLView from "react-native-htmlview";

// uri: "https:" + props.message.sender.state().gravatar

const Message = props => {
  //if the user is "me" render right, if not render left
  return (
    <View style={styles.messageContainer}>
      <View style={styles.avatar}>
        <Avatar
          small
          rounded
          source={{
            uri: "https://vignette2.wikia.nocookie.net/starwars/images/0/02/Jar_Jar_SWSB.png/revision/latest?cb=20160910034613"
          }}
          activeOpacity={0.7}
        />
      </View>
      <View style={{ flexDirection: "column", flex:1 }}>
        <Text style={styles.messageUID}>{props.message.sender.uuid} </Text>
        <View style={styles.recievedMessages}>
          <HTMLView value={props.message.data.text} stylesheet={styles} />
        </View>
      </View>
    </View>
  );
};

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    console.log("Mounting MessageList");
    this.props.chat.on("message", payload => {
      this.setState({ messages: [...this.state.messages, payload] });
      console.log("new message", this.state.messages);
      setTimeout(() => this.flatList.scrollToEnd(), 200)   
    });

    this.props.chat.on("$.history.message", payload => {
      this.setState({ messages: [...this.state.messages, payload] });
      console.log("old message", payload);
      setTimeout(() => this.flatList.scrollToEnd(), 200)   
    });

    this.props.chat.history("message");
    setTimeout(() => this.flatList.scrollToEnd(), 200)   
  }

  render() {
    return (
      <FlatList
        ref={el => this.flatList = el}
        data={this.state.messages}
        extraData = {this.state}
        renderItem={({ item }) => <Message message={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  messageList: {
    flex: 1
  },
  recievedMessages: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 60,
    minHeight: 40,
    justifyContent: "center",
    marginBottom: 3,
    padding: 3
  },
  myMessages: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "#0084ff",
    marginLeft: 60,
    minHeight: 40,
    justifyContent: "center",
    marginBottom: 3,
    padding: 3
  },
  messageContainer: {
    flexDirection: "row",
    flex: 1
  },
  avatar: {
    flexDirection:'column',
    justifyContent:'center',
    marginRight: 3,
  }, 
  messageUID: {
    color: '#C5C0B1',
  }
});

export default MessageList;

// <ScrollView
// scrollEnabled={this.state.isScrollActive}
//   onLayout={() => {
//     this.scrollView.scrollToEnd({animated: true});
//   }}
//   onContentSizeChange={() => {
//     this.scrollView.scrollToEnd({animated: false});
//   }}
//   onScroll={(e) => {
//     if (e.nativeEvent.contentSize.height < e.nativeEvent.layoutMeasurement.height) {
//       this.setState({
//         isScrollActive: false
//     }, () => this.scrollView.scrollToEnd({animated: false}));
//   } else {
//     this.setState({
//       isScrollActive: true
//   });
//   }
// }}
// ref={scrollView => this.scrollView = scrollView}
// >
