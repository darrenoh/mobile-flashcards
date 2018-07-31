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
        />
        <TextInput
          onChangeText={answer => this.setState({answer})}
          onSubmitEditing={this.submit}
          placeholder="Answer"
          value={this.state.answer}
        />
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
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
