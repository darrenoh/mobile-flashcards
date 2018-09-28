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
          <Text style={styles.count}>{card + 1} / {questions.length}</Text>
          <Card card={questions[card]} />
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={this.correct}
              style={styles.greenButton}
            >
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.next}
              style={styles.redButton}
            >
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={{
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <Text style={{fontSize: 50}}>{Math.round(correct / Math.max(questions.length, 1) * 100)}% correct!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  count: {
    alignSelf: 'flex-start',
    fontSize: 20
  },
  buttons: {
    alignItems: 'center'
  },
  greenButton: {
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 7,
    height: 50,
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  redButton: {
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 7,
    height: 50,
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
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

export default connect(mapStateToProps)(Quiz);
