import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {saveDeckTitle} from '../utils/helpers';

export default class NewDeck extends Component {
  state = {
    title: ''
  };

  submit = () => {
    saveDeckTitle(this.state.title)
      .then(() => this.setState({title: ''}));
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={title => this.setState({title})}
          onSubmitEditing={this.submit}
          placeholder="Deck Title"
          value={this.state.title}
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
