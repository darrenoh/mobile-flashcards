import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {receiveDecks} from '../actions';
import {getDecks} from '../utils/helpers';

class DeckList extends Component {
  componentDidMount () {
    const {dispatch} = this.props;
    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
  }

  keyExtractor = (item) => item.title;

  renderItem = ({item}) => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate(
        'Deck',
        {title: item.title}
      )}>
        <View style={styles.deck}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.cards}>{item.questions.length} {item.questions.length === 1 ? 'card' : 'cards'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render () {
    const {decks} = this.props;
    return (
      <FlatList
        style={styles.container}
        data={Object.values(decks)}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: 'grey'
            }}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  deck: {
    margin: 60,
    alignItems: 'center'
  },
  title: {
    fontSize: 30
  },
  cards: {
    fontSize: 20,
    color: 'grey'
  }
});

function mapStateToProps (state) {
  return {decks: state};
}

export default connect(mapStateToProps)(DeckList);
