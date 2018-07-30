import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {receiveDecks} from '../actions';
import {getDecks} from '../utils/helpers';

class DeckList extends Component {
  componentDidMount () {
    const {dispatch} = this.props;
    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
  }

  render () {
    const {decks} = this.props;
    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => 
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Deck',
            {deck: decks[deck]}
          )}>
            <View key={deck} style={{margin: 20, alignItems: 'center'}}>
              <Text>{decks[deck].title}</Text>
              <Text>{decks[deck].questions.length} {decks[deck].questions.length === 1 ? 'card' : 'cards'}</Text>
            </View>
          </TouchableOpacity>
        )}
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList);
