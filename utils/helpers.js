import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';

const DECK_STORAGE_KEY = 'mobile-flashcards:decks'
const NOTIFICATION_KEY = 'mobile-flashcards:notifications';

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(decks => JSON.parse(decks) || {});
}

export function saveDeck (deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }));
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}

function createNotification () {
  return {
    title: 'Study!',
    body: '👋 Don’t forget to study today!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}
