import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
	static navigationOptions = {
		headerStyle: {
			marginTop: Platform.OS === 'android' ? 0 : 0
		}
	}

	render() {
		return (
			<View>
				<Button 
				title="Reset liked jobs"
				large
				icon={{ name: 'delete-forever' }}
				backgroundColor="#F44336"
				onPress={this.props.clearLikedJobs}
				/>
			</View>
		);
	}
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
