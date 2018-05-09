import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import {Constants} from 'expo';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList
  },
  New: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  }
});

export default class App extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <View  style={{height: Constants.statusBarHeight}}>
          <StatusBar translucent barStyle='dark-content' />
        </View>
        <Tabs />
      </View>
    );
  }
}
