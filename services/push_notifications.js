import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
	let previousToken = await AsyncStorage.getItem('pushtoken');
	console.log(previousToken);

	if (previousToken) {
		return;
	} else {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.REMOTE_NOTIFICATIONS
		);
		let finalStatus = existingStatus;
		
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			return;
		}

		let token = await Notifications.getExpoPushTokenAsync();

		await axios.post(PUSH_ENDPOINT, { token: { token } });
		AsyncStorage.setItem('pushtoken', token);
		console.log(token);
	}
};

/*const { status: existingStatus } = await Permissions.getAsync(
    	Permissions.NOTIFICATIONS
  	);

	  let finalStatus = existingStatus;

	  if (existingStatus !== 'granted') {
	    // Android remote notification permissions are granted during the app
	    // install, so this will only ask on iOS
	    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
	    finalStatus = status;
	  }
		
		if (existingStatus !== 'granted') {
			return;
		}

		let token = await Notifications.getExpoPushTokenAsync();
		await axios.post(PUSH_ENDPOINT, { token: { token } });
		AsyncStorage.setItem('pushtoken', token);
		console.log(token);
		}*/

