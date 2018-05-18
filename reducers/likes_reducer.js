import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import {
	LIKE_JOB,
	CLEAR_LIKED_JOBS
} from '../actions/types';

export default function (state = [], action) {
	console.log(action);
	switch (action.type) {
		case REHYDRATE:
			return (action.payload.likedJobs !== 'undefined') ? action.payload.likedJobs : [];
		case CLEAR_LIKED_JOBS:
			return [];
		case LIKE_JOB:
			return _.uniqBy([
				action.payload, ...state
				], 'jobkey');
		default:
			return state;
	}
}
