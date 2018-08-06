import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import Card from './Card';

class Quiz extends Component {
  state = {
    card: 0,
    correct: 0
  };

  correct = () => {
    let {correct} = this.state;
    correct++;
    this.setState({correct});
    this.next();
  };

  next = () => {
    let {card} = this.state;
    card++;
    this.setState({card});
  };

  render () {
    const {decks, title} = this.props;
    const {questions} = decks[title];
    const {card, correct} = this.state;
    if (card < questions.length) {
      return (
        <View style={styles.container}>
          <Text>{card + 1} / {questions.length}</Text>
          <Card card={questions[card]} />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.correct}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.next}>
              <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text>{Math.round(correct / Math.max(questions.length, 1) * 100)}% correct!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  buttons: {
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

export default connect(mapStateToProps)(Quiz);
