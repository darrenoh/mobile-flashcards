import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDeck} from '../utils/helpers';
import {Card} from './Card';

export default class Quiz extends Component {
  state = {
    title: '',
    questions: [],
    question: 0,
    correct: 0
  };

  correct = () => {
    let {correct} = this.state;
    correct++;
    this.setState({correct});
    this.next();
  };

  next = () => {
    let {question} = this.state;
    question++;
    this.setState({question});
  };

  componentDidMount () {
    getDeck(this.props.id)
      .then(deck => this.setState({...deck}));
  }

  render () {
    const {questions, question, correct} = this.state;
    if (question < questions.length) {
      return (
        <View>
          <Text>{question + 1} / {questions.length}</Text>
          <Card question={questions[question]} />
          <View>
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
        <View>
          <Text>{Math.round(correct / questions.length * 100)}% correct!</Text>
        </View>
      );
    }
  }
}
