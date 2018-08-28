import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl
  } from 'react-native';
import { Constants } from 'expo';
import _ from 'lodash';

import InstaPost from './components/InstagramPost/InstagramPost';
import TwitterPost from './components/TwitterPost/TwitterPost';

export default class App extends Component {

  state = {
    data: null,
    loaded: false,
    refreshing: false,
  }

  componentDidMount = () => {
    this._fetchFeeds();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._fetchFeeds().then(() => {
      this.setState({refreshing: false});
    });
  }

  _fetchTwitter = async () => {
    const twitterFetch = await fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=20', {  headers:
      {
        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAAnR6QAAAAAANU4%2BMii85FEbfGIuxlJY5ESDzVM%3DBGodfdRs3F78EvmwzineWaXiDnyfj7950TkAl4yOxTECP8708n',
      'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const twitterPosts = await twitterFetch.json();

    const convertedData = twitterPosts.map(post => ({medium: 'twitter', ...post, created_at: new Date(post.created_at)}));

    return convertedData;
  }

  _fetchInstagram = async () => {
    const access_token = '32234864.a65556c.c8e41eb66096430298f571c76ee9a234';

    const instaFetch = await fetch(
      'https://api.instagram.com/v1/users/self' +
      '/media/recent/?access_token=' +
      access_token
    );

    const instaPosts = await instaFetch.json();

    const convertedData = instaPosts.data.map(post => ({medium: 'instagram', created_at: new Date(post.created_time*1000), ...post}));

    return convertedData;
  }

  _fetchFeeds = async () => {
    const instaData = await this._fetchInstagram();
    const twitterData = await this._fetchTwitter();

    console.log(twitterData);

    const combinedData = _.shuffle(instaData.concat(twitterData))

    //combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


    this.setState({
          data: combinedData,
          loaded: true
      })
    }

  _createPost = (postData, index) => {
    if(postData.medium === 'instagram') {
      return (
        <InstaPost
          imageUri={postData.images.standard_resolution.url}
          username={postData.user.username}
          numLikes={postData.likes.count}
        />
    )}
    if(postData.medium === 'twitter') {
      return (
        <TwitterPost
          name={postData.user.screen_name}
          text={postData.text}
          imageUri={postData.user.profile_image_url}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => this._createPost(item, index)}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});
