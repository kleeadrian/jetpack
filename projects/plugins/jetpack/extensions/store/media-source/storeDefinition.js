
/**
 * Internal dependencies
 */
import { STATE_PAUSED } from './constants';

const DEFAULT_STATE = {
	players: {},
	default: null,
};

const actions = {
	registerMediaSource( id, mediaSourceState ) {
		return {
			type: 'REGISTER_MEDIA_SOURCE',
			id,
			mediaSourceState,
		};
	},

	unregisterMediaSource( id ) {
		return {
			type: 'UNREGISTER_MEDIA_SOURCE',
			id,
		};
	},

	setMediaSourceAsDefault( id ) {
		return {
			type: 'SET_MEDIA_SOURCE_AS_DEFAULT',
			id,
		};
	}
};

const selectors = {};

const storeDefinition = {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'REGISTER_MEDIA_SOURCE': {
				return {
					...state,
					players: {
						...state.players,
						[ action.id ]: {
							id: action.id,
							...action.mediaSourceState,
						}
					},
				};
			}

			case 'UNREGISTER_MEDIA_SOURCE': {
				const currentState = Object.assign( {}, state );
				if ( currentState.players[ action.id ] ) {
					delete currentState.players[ action.id ];
				}
				return currentState;
			}

			case 'SET_MEDIA_SOURCE_AS_DEFAULT': {
				return {
					...state,
					default: action.id,
				};
			}
		}

		return state;
	},

	actions,

	selectors,
};
export default storeDefinition;
