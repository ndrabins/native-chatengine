import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('ChatRoom')}
          style={styles.DrawerItem}>
          Chatroom
        </Text>
        <Text> Direct Messages </Text>
        <View style={{ borderWidth: 1, borderBottomColor: "#303030"}} />
        <Text
          onPress={() => navigation.navigate('screen2')}
          style={styles.DrawerItem}>
          Screen 2
        </Text>
      </View>
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