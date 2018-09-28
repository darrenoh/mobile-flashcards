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
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cards}>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity onPress={() => navigation.navigate(
            'Card',
            {title}
          )} style={styles.whiteButton}>
            <Text style={styles.whiteButtonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (deck.questions.length > 0) {
              navigation.navigate(
                'Quiz',
                {title}
              );
            }
          }} style={styles.blackButton}>
            <Text style={styles.blackButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  section: {
    alignItems: 'center'
  },
  title: {
    fontSize: 50
  },
  cards: {
    fontSize: 30,
    color: 'grey'
  },
  whiteButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 7,
    height: 50,
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  whiteButtonText: {
    color: 'black',
    fontSize: 20
  },
  blackButton: {
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 7,
    height: 50,
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  blackButtonText: {
    color: 'white',
    fontSize: 20
  }
});

function mapStateToProps (state, {navigation}) {
  const {title} = navigation.state.params;
  return {
    decks: state,
    title
  };
}

export default connect(mapStateToProps)(Deck);
