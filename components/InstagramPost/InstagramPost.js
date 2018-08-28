import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

class InstagramPost extends Component {
  render() {
    return (
        <View>
          <Image
            style={styles.image}
            source={{ uri: this.props.imageUri }} />
          <View style={styles.info}>
            <Text style={styles.infoText}>
              {this.props.username}
            </Text>
            <Text style={styles.infoText}>
              {this.props.numLikes + (this.props.numLikes !== 1 ? ' likes' : ' like')}
            </Text>
          </View>
        </View>
      )}
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})

export default InstagramPost
