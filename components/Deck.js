import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDeck} from '../utils/helpers';

export default class Deck extends Component {
  state = {
    title: '',
    questions: []
  };

  componentDidMount () {
    getDeck(this.props.id)
      .then(deck => this.setState({...deck}));
  }

  render () {
    return (
      <View>
        <Text>{this.state.deck.title}</Text>
        <Text>{this.state.deck.questions.length} {this.state.deck.questions.length === 1 ? 'card' : 'cards'}</Text>
        <TouchableOpacity>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
