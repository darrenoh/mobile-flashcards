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
        <Text style={styles.label}>{this.props.card[side]}</Text>
        <TouchableOpacity onPress={this.flip}>
          <Text style={styles.flip}>{side === 'question' ? 'Answer' : 'Question'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  label: {
    fontSize: 50,
    textAlign: 'center',
    margin: 20
  },
  flip: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  }
});
