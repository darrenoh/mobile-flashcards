import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {addDeck} from '../actions';
import {saveDeck} from '../utils/helpers';

class AddDeck extends Component {
  state = {
    title: ''
  };

  submit = () => {
    const title = this.state.title.trim();
    const {decks, dispatch, navigation} = this.props;
    if (title && !decks[title]) {
      const deck = {
        title,
        questions: []
      };
      dispatch(addDeck({
        [title]: deck
      }));
      navigation.dispatch(NavigationActions.back({
        key: 'New'
      }));
      saveDeck(deck)
        .then(() => this.setState({title: ''}));
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={title => this.setState({title})}
          onSubmitEditing={this.submit}
          placeholder="Deck Title"
          value={this.state.title}
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
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 7,
    fontSize: 20,
    padding: 10,
    margin: 40,
    marginLeft: 30,
    marginRight: 30
  },
  label: {
    fontSize: 50,
    textAlign: 'center'
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 7,
    height: 50,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
});

function mapStateToProps (state) {
  return {decks: state};
}

export default connect(mapStateToProps)(AddDeck);
