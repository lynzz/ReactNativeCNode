/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {
  AppRegistry,
  Navigator
} from 'react-native';

import IndexView from './App/Views/Index'

var ReactNativeCNode = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'Topic', component: IndexView}}
        renderScene={(route, navigator) => {
          let Component = route.component
          return <Component {...route.params} navigator={navigator} />
        }}
      >
      </Navigator>
    );
  }
});
AppRegistry.registerComponent('ReactNativeCNode', () => ReactNativeCNode);
