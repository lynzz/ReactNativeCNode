import React, {Component} from 'react'
import {
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  PropTypes,
  Platform
} from 'react-native';


class Spinner extends Component {
  static defaultProps={
    color: '#42b983'
  };

  render() {
    if (Platform.OS === 'android') {
      return (
        <ProgressBarAndroid
          {...this.props}/>
      )
    }
    return (
      <ActivityIndicatorIOS
        animating={true}
        {...this.props}/>
    )
  }
}


export default Spinner;


