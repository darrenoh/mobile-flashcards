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
        <View style={{margin: 20, alignItems: 'center'}}>
          <Text>{item.title}</Text>
          <Text>{item.questions.length} {item.questions.length === 1 ? 'card' : 'cards'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render () {
    const {decks} = this.props;
    return (
      <FlatList
        data={Object.values(decks)}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

function mapStateToProps (state) {
  return {decks: state};
}

export default connect(mapStateToProps)(DeckList);
