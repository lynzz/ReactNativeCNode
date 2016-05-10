'use strict'

import React, {Component} from'react'

var HtmlRender = require('react-native-html-render')

import { link } from './Util'

import {
  View,
  Text,
  StyleSheet,
  Image,
  LinkingIOS,
  Dimensions,
  Navigator
} from 'react-native'

var { height, width } = Dimensions.get('window')

class HtmlContent extends Component {
  constructor (props) {
    super(props)
  }

  _onLinkPress (url) {
    if (/^https?:\/\/.*/.test(url)) {
      link(url)
    }

    if (/^mailto:\w*/.test(url)) {
      link(url)
    }
  }

  _renderNode (node, index, parent, type) {
    var name = node.name
    if (node.type == 'block' && type == 'block') {
      if (name == 'img') {
        var uri = node.attribs.src
      
        return ( 
          <View 
            key = {index}
            style = {styles.imgWrapper}>
            <Image 
              source = {{uri: uri}}
              style = {styles.img}>
            </Image> 
          </View>
        )
      }
    }
  }

  render () {
    return ( 
      <HtmlRender
        value = {this.props.content}
        stylesheet = {this.props.style}
        onLinkPress = {this._onLinkPress.bind(this)}
        renderNode = {this._renderNode}/>
    )
  }

}

var styles = StyleSheet.create({
  imgWrapper: {
    
  },
  img: {
    width: width - 30,
    height: width - 30,
    resizeMode: Image.resizeMode.contain
  }
})

module.exports = HtmlContent
