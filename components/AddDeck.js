import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {addDeck} from '../actions';
import {saveDeckTitle} from '../utils/helpers';

class AddDeck extends Component {
  state = {
    title: ''
  };

  submit = () => {
    const {title} = this.state;
    const {decks, dispatch} = this.props;
    if (!decks[title]) {
      dispatch(addDeck({
        [title]: {
          title,
          questions: []
        }
      }));
      this.props.navigation.dispatch(NavigationActions.back({
        key: 'New'
      }));
      saveDeckTitle(title)
        .then(() => this.setState({title: ''}));
    }
  };

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

function mapStateToProps (state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps)(AddDeck);
