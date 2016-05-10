import React from 'react'
import {
  View,
  StyleSheet,
  Component,
  Text,
  ListView,
  Dimensions,
  PropTypes,
  RefreshControl
} from 'react-native';
import moment from 'moment';

import Spinner from '../../Components/Spinner'

import TopicService from '../../Services/Topic'

import TopicRow from './TopicRow';

import TopicDetail from './TopicDetail'

const {height, width} = Dimensions.get('window')

const TopicList = React.createClass({
  getInitialState () {
    return {
      isRefreshing: false,
      page: 1,
      pageSize: 20,
      dataRows: [],
      loaded: false,
      reachedEndPending: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },

  _onEndReached () {
    console.log('end reached');
    this.setState({
      reachedEndPending: true,
      page: this.state.page + 1
    })
    this._fetchData()
  },

  _renderFooter () {
    if (this.state.reachedEndPending) {
      return (
        <View style={styles.reachedEndLoading}>
          <Spinner size="large"/>
        </View>
      )
    }
    return null;
  },

  _renderHeader () {
    
    return null;
  },

  componentDidMount () {
    this._fetchData()
  },

  _fetchData () {
    var that = this;
    if (this.state.page === 1) {
      this.setState({dataRows: []});
    }

    TopicService.topicsList({
      page: this.state.page,
      tab: this.props.tab,
      limit: this.state.pageSize
    })
    .then((data) => {
      let rows = that.state.dataRows.concat(data)
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(rows),
        reachedEndPending:　false,
        isRefreshing: false,
        loaded: true,
        dataRows: rows
      });
    }, (err) => {
      console.log(err);
    });
  },

  selectTopic (id, title) {
    
  },

  renderRow (topic) {
    return (
      <TopicRow
        key={topic.id}
        topic={topic}
        selectTopic={this.props.selectTopic}
      />
    )
  },

  _onRefresh () {
    this.setState({
      page: 1,
      isRefreshing: true
    })
    this._fetchData()
  },

  render () {
    if (!this.state.loaded) {
      return (
        <View style={styles.loadingContainer}>
          <Spinner size="large"/>
        </View>
      )
    }
    return (
      <ListView
        showsVerticalScrollIndicator
        removeClippedSubviews
        enableEmptySections
        initialListSize={this.state.pageSize}
        pagingEnabled={false}
        scrollRenderAheadDistance={90}
        dataSource={this.state.dataSource}
        renderRow={(topic) => this.renderRow(topic)}
        onEndReachedThreshold={30}
        onEndReached={this._onEndReached}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor='#42b983'
            title='下拉刷新'
          />
        }/>
    )
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width
  },
  loadingContainer: {
    paddingTop: 50
  },
  loading: {
    marginTop: 250
  },
  reachedEndLoading: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default TopicList;
