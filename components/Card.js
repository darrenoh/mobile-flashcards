import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Card extends Component {
  state = {
    side: 0,
  };

  flip = () => {
    const {side} = this.state;
    const flip = [1, 0];
    this.setState({side: flip[side]});
  };

  render () {
    return (
      <View>
        <Text>{this.props.question}</Text>
        <TouchableOpacity onPress={this.flip}>
          <Text>Answer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
