import React, { Component } from 'react';
import { ScrollView, Text, View, Platform, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {

	static navigationOptions = (props) => {
		const { navigate } = props.navigation;
		return {
			title: 'Review Jobs',
			headerRight: (
				<Button 
					title="Settings" 
					onPress={() => navigate('settings')} 
					backgroundColor="rgba(0, 0, 0, 0)"
					color="rgba(0, 122, 255, 1)"
				/>
				),
			style: {
				marginTop: Platform.OS === 'android' ? 24 : 0
			}
		};
	}

	renderLikedJobs = () => {
		return this.props.likedJobs.map(job => {
			const { 
				company, 
				formattedRelativeTime, 
				url, 
				latitude, 
				longitude, 
				jobtitle,
				jobkey 
			} = job;

			const initialRegion = {
				longitude,
				latitude,
				latitudeDelta: 0.045,
				longitudeDelta: 0.02
			};

			return (
				<Card key={jobkey} title={jobtitle}>
					<View style={{ height: 200 }}>
						<MapView
							style={{ flex: 1 }}
							cacheEnabled={Platform.OS === 'android'}
							scrollEnabled={false}
							initialRegion={initialRegion}
						/>
						<View style={styles.detailedWrapper}>
							<Text style={styles.italics}>{company}</Text>
							<Text style={styles.italics}>{formattedRelativeTime}</Text>
						</View>
						<Button 
							title="Aplly"
							backgroundColor="#03A9F4"
							onPress={() => Linking.openURL(url)}
						/>
					</View>
				</Card>
			);
		});
	}

	render() {
		return (
			<ScrollView>
				{this.renderLikedJobs()}
			</ScrollView>
		);
	}
}

const styles = {
	italics: {
		fontStyle: 'italic' 
	},
	detailedWrapper: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
};

function mapStateToProps(state) {
	return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
