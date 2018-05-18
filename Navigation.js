import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

let reviewNavigation = createStackNavigator({
  review: ReviewScreen,
  settings: SettingsScreen
});

let mainNavigation = createBottomTabNavigator({
  map: MapScreen,
  deck: DeckScreen,
  review: reviewNavigation
}, 
{
  tabBarOptions: {
    labelStyle: { fontSize: 12 }
  }
});

reviewNavigation.navigationOptions = {
  tabBarLabel: 'Review Jobs', 
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="favorite" size={30} color={tintColor} />;
  }
};

export default createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: mainNavigation
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: true
});

/*class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
