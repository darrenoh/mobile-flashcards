import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {getDeck} from '../utils/helpers';

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    const {deck} = navigation.state.params;
    return {
      title: deck.title
    };
  };

  render () {
    const {deck} = this.props;
    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
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

function mapStateToProps (decks, {navigation}) {
  const {deck} = navigation.state.params;
  return {
    deck
  };
}

export default connect(mapStateToProps)(Deck);
