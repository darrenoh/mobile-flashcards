import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {addDeck} from '../actions';
import {saveDeck} from '../utils/helpers';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  submit = () => {
    const {decks, dispatch, navigation, title} = this.props;
    const deck = decks[title];
    const question = this.state.question.trim();
    const answer = this.state.answer.trim();
    if (question && answer) {
      deck.questions.push({
        question,
        answer
      });
      dispatch(addDeck({
        [title]: deck
      }));
      navigation.dispatch(NavigationActions.back());
      saveDeck(deck)
        .then(() => this.setState({
          question: '',
          answer: ''
        }));
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={question => this.setState({question})}
          placeholder="Question"
          value={this.state.question}
          style={styles.input}
        />
        <TextInput
          onChangeText={answer => this.setState({answer})}
          onSubmitEditing={this.submit}
          placeholder="Answer"
          value={this.state.answer}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.submit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'stretch'
  },
  input: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 7,
    fontSize: 20,
    padding: 10,
    margin: 20
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  buttonText: {
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

export default connect(mapStateToProps)(AddCard);
