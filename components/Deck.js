import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return {title};
  };

  render () {
    const {decks, navigation, title} = this.props;
    const deck = decks[title];
    return (
      <View>
        <Text>{title}</Text>
        <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(
          'Card',
          {title}
        )}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps (state, {navigation}) {
  const {title} = navigation.state.params;
  return {
    decks: state,
    title
  };
}

export default connect(mapStateToProps)(Deck);
