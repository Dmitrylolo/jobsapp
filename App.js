import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications } from 'expo';
import { Alert } from 'react-native';

import configureStore from './store';
import Navigation from './Navigation';

import registerForNotifications from './services/push_notifications';

const { persistor, store } = configureStore();

class App extends React.Component {
	componentDidMount() {
		registerForNotifications();
		Notifications.addListener((notification) => {
			const { data: { text }, origin } = notification;
			/*const text = notification.data.text;*/ // For remind

			if (origin === 'received' && text) {
				Alert.alert(
					'New notification',
					text,
					[{ text: 'Ok.' }]
				);
			}
		});
	}

  render() {
    return (
       <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
						<Navigation />
          </PersistGate>
       </Provider>
    );
  }
}

export default App;
