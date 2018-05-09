import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getDecks} from '../utils/helpers';

export default class DeckList extends Component {
  state = {
    decks: {}
  }

  componentDidMount () {
    getDecks()
      .then(decks => this.setState({decks}));
  }

  render () {
    const {decks} = this.state;
    return (
      <View style={styles.container}>
        { Object.keys(decks).map(deck => 
          <View key={deck} style={{margin: 20, alignItems: 'center'}}>
            <Text>{decks[deck].title}</Text>
            <Text>{decks[deck].questions.length} {decks[deck].questions.length === 1 ? 'card' : 'cards'}</Text>
          </View>
        ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
