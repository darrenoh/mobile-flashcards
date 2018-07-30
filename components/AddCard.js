import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {addCardToDeck} from '../utils/helpers';

export default class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  submit = () => {
    addCardToDeck(this.props.title, this.state);
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
