import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Card extends Component {
  state = {
    side: 'question',
  };

  flip = () => {
    const {side} = this.state;
    const flip = {
      question: 'answer',
      answer: 'question'
    };
    this.setState({side: flip[side]});
  };

  render () {
    const {side} = this.state;
    return (
      <View style={styles.container}>
        <Text>{this.props.card[side]}</Text>
        <TouchableOpacity onPress={this.flip}>
          <Text>{side === 'question' ? 'Answer' : 'Question'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
