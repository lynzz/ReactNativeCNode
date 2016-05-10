'use strict';
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  } from 'react-native'

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';  

import TabBar from './TabBar'

import TopicList from './Topic/TopicList'
import TopicDetail from './Topic/TopicDetail'

const MENU = [{
  role: 'all',
  name: '全部'
}, {
  role: 'good',
  name: '精华'
}, {
  role: 'share',
  name: '分享'
}, {
  role: 'ask',
  name: '问答'
}, {
  role: 'job',
  name: '招聘'
}]

const IndexView = React.createClass({
  getInitialState () {
    return {
      dataRows: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      tab: 'all'
    }
  },
  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView 
          initialPage={0}
          onChangeTab={this._onChangeTab}
          renderTabBar={() => <TabBar />}
        >
          {this._renderTopicList()}
        </ScrollableTabView>
      </View>
    );
  },

  _renderTopicList() {
    return MENU.map((item)=> {
      return (
        <TopicList
          key={item.role}
          selectTopic={this.selectTopic}
          tab={item.role}
          style={styles.tabView}
          tabLabel={item.name}/>
      );
    });
  },

  selectTopic (id, title) {
    this.props.navigator.push({
      name: title,
      component: TopicDetail,
      params: {
        topicId: id
      }
    })
  },

  _onChangeTab (tab) {
    this.setState({
      tab: MENU[tab.i].role
    })
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  }
});

export default IndexView;
