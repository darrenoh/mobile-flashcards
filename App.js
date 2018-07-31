import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Constants} from 'expo';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import AddCard from './components/AddCard';

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList
  },
  New: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
  Card: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  }
});

export default class App extends Component {
  render () {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <View  style={{height: Constants.statusBarHeight}}>
            <StatusBar translucent barStyle='dark-content' />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
