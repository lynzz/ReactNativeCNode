'use strict';

import React from 'react'

import moment from 'moment'

const HtmlContent = require('../../Components/HtmlContent')
import TopicService from '../../Services/Topic'

import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicatorIOS,
  Dimensions,
  TouchableHighlight
  } from 'react-native';

var {height,width} = Dimensions.get('window')  

var TopicDetail = React.createClass({
  getInitialState () {
    return {
      loaded: false,
      topicData: {}
    }
  },
  render: function () {
    let self = this
    if (this.state.loaded) {
      let data = this.state.topicData
      let createdDate = moment(data.create_at).startOf('minute').fromNow()
      return (
        <ScrollView style={styles.scrollView}>
          <View style={styles.qContainer}>
            <View style={styles.qHeader}>
              <Text style={styles.qTitle}>{data.title}</Text>
            </View>
            
            <View style={styles.qBody}>
              <HtmlContent
                content={data.content}
              />
            </View>
            <View style={[styles.flexRow, styles.userInfo]}>
              <Text style={[styles.inlineShow, styles.userName]}>{data.author.loginname}</Text>
              <Text style={styles.grayText}>{createdDate}</Text>
            </View>
          </View>
          <View style={styles.answerHeader}>
            <Text style={styles.grayText}>{data.reply_count} 回复</Text>
          </View>
          {this._renderReplies(data.replies)}
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicatorIOS color="#009a61" style={{marginVertical: 30, marginBottom: 30}} />
        </View>
      );
    }
    
  },

  _renderReplies (replies) {
    let self = this

    if (replies.length === 0) {
      return (
        <Text style={[styles.grayText, styles.empty]}>暂时没有人回答</Text>
      )
    }
    return replies.map((item) => {
      let createdDate = moment(item.create_at).startOf('minute').fromNow()
      return (
        <View style={styles.answerItem} key={item.id}>
          <View style={[styles.flexRow]}>
            <Image style={[styles.inlineShow, styles.avatar]} source={{uri: item.author.avatar_url}}/>
            <Text style={[styles.inlineShow, styles.userName, styles.lineHeight]}>{item.author.loginname}</Text>
            <Text style={[styles.inlineShow, styles.lineHeight, styles.grayText]}>{createdDate}</Text>
          </View>
          <View>
            <HtmlContent
              content={item.content}
            />
          </View>
        </View>
      )
    })
  },
  componentDidMount: function () {
    this._fetchData();
  },

  _fetchData () {
    TopicService.getTopic(this.props.topicId)
      .then(topicData => {
        this.setState({
          topicData: topicData,
          loaded: true
        })
      })
  }
});

var styles = StyleSheet.create({
  scrollView: {
    height: height
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: 10,
    borderRadius: 16
  },
  empty: {
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  loadingContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  qContainer: {
    padding: 10
  },
  qHeader: {
    paddingTop: 30
  },
  flexRow: {
    flexDirection: 'row'
  },
  qTag: {
    color: '#017e66',
    fontSize: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 6,
    paddingLeft: 6,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 3,
    backgroundColor: '#ECF5F3'
  },
  inlineShow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  lineHeight: {
    lineHeight: 24
  },
  qBody: {
    paddingTop: 10,
  },
  qTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  userInfo: {
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#E2E2E2'
  },

  userName: {
    color: '#017e66',
    marginRight: 10
  },

  voco: {
    paddingBottom: 8,
    flexDirection: 'row',
    paddingTop: 8
  },

  vote: {
    flex: 1,
    color: '#ccc'
  },

  comment: {
    flex: 1,
    color: '#ccc'
  },

  answerItem: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#E2E2E2'
  },

  answerHeader: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderColor: '#E2E2E2'
  },

  answerBody: {
    
  },

  grayText: {
    color: '#ccc'
  }
});

export default TopicDetail;
