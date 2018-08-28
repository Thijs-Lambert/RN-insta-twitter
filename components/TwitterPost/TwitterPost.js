import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

class TwitterPost extends Component {
  render() {
    return (
      <View style={styles.tweet}>
        <View style={styles.tweetHeader}>
          <Image
            source={{ uri: this.props.imageUri }}
            style={styles.image}
          />
          <Text
            style={styles.tweetName}>{this.props.name}</Text>
        </View>
        <Text
            style={styles.tweetBody}>{this.props.text}</Text>
      </View>)
      }
}

const styles = StyleSheet.create({
  tweet: {
    width: Dimensions.get('window').width,
    height: 'auto',
    padding: 10,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 24
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tweetName: {
    fontWeight: 'bold',
    padding: 5
  },
  tweetBody: {
    paddingTop: 5,
    fontSize: 15,
  }
})

export default TwitterPost
