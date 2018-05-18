import _ from 'lodash';
import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { AsyncStorage, Platform } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome to JobApp', color: '#03A9F4' },
	{ text: 'Use this to get a job', color: '#009688' },
	{ text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
	state = { token: null }

	async componentWillMount() {
		let token = await AsyncStorage.getItem('fb_token');

		if (token) {
			this.props.navigation.navigate('map');
			this.setState({ token });
		} else {
			this.setState({ token });
		}
	}

	onSlidesComplete = () => {
		this.props.navigation.navigate('auth');
	}

	render() {
		if (Platform.OS !== 'android' && _.isNull(this.state.token)) {
			return <AppLoading />;
		}
		return (

			<Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
		);
	}
}

export default WelcomeScreen;
