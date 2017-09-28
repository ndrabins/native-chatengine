import React, { Component } from "react";
import { Header,Text, Avatar } from "react-native-elements";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";

import ChatEngineGravatar from "chat-engine-gravatar";
import ChatEngineMarkdown from "chat-engine-markdown";

import HTMLView from "react-native-htmlview";

// uri: "https:" + props.message.sender.state().gravatar

const Message = props => {
  //if the user is "me" render right, if not render left

  if (props.message.sender.uuid === props.me.uuid) {
    //return users own messages with different styling
    return (
      <View style={styles.myMessageContainer}>
        <View style={styles.myMessages}>
          <HTMLView value={`<p> ${props.message.data.text} </p>`} stylesheet={styles} />
        </View>
      </View>
    );
  }

  //this is to handle the case that history returns a user object instead of a string for the uuid
  if(props.message.sender.uuid){
    return (
      <View style={styles.messageContainer}>
        <View style={styles.avatar}>
          <Avatar
            small
            rounded
            source={{
              uri:
                "https://vignette2.wikia.nocookie.net/starwars/images/0/02/Jar_Jar_SWSB.png/revision/latest?cb=20160910034613"
            }}
            activeOpacity={0.7}
          />
        </View>
        <View style={{ flexDirection: "column"}}>
          <Text style={styles.messageUID}>{props.message.sender.uuid}</Text>
          <View style={styles.recievedMessages}>
            <HTMLView value={props.message.data.text} stylesheet={styles} />
          </View>
        </View>
      </View>
    );
  }

  //messages that aren't from me
  return (
    <View style={styles.messageContainer}>
      <View style={styles.avatar}>
        <Avatar
          small
          rounded
          source={{
            uri:
              "https://vignette2.wikia.nocookie.net/starwars/images/0/02/Jar_Jar_SWSB.png/revision/latest?cb=20160910034613"
          }}
          activeOpacity={0.7}
        />
      </View>
      <View style={{ flexDirection: "column"}}>
        <Text style={styles.messageUID}>{props.message.sender} </Text>
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

  _keyExtractor = (item, index) => index;

  componentDidMount() {
    console.log("Mounting MessageList");
    this.props.chat.on("message", payload => {
      this.setState({ messages: [...this.state.messages, payload] });
      console.log("new message", this.state.messages);
      setTimeout(() => this.flatList.scrollToEnd(), 200);
    });

    this.props.chat.on("$.history.message", payload => {
      console.log("old message", payload);
      this.setState({ messages: [...this.state.messages, payload] });
    });

    this.props.chat.history("message");
  }

  render() {
    return (
      <FlatList
        ref={el => (this.flatList = el)}
        data={this.state.messages}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => <Message message={item} me={this.props.me} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  messageList: {
    flex: 1
  },
  recievedMessages: {
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 60,
    minHeight: 30,
    justifyContent: "center",
    marginBottom: 3,
    padding: 5,
    alignItems:'flex-start',
  },
  myMessages: {
    borderRadius: 15,
    backgroundColor: "#D02129",
    marginLeft: 60,
    minHeight: 30,
    justifyContent: "center",
    marginBottom: 3,
    padding: 5,
    alignItems:'flex-end',
  },
  myMessageContainer: {
    flexDirection: "row",
    flex: 1,
    alignSelf: 'flex-end',
  },
  messageContainer: {
    flexDirection: "row",
    flex: 1,
    alignSelf: 'flex-start',
  },
  avatar: {
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 3
  },
  messageUID: {
    color: "#C5C0B1"
  },

  //this is for styling HTMLview
  p: {
    color:'#FFFFFF'
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
