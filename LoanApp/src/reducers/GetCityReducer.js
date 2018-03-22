import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingCity:false,responseDataCity:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){

    case ACTION_TYPES.CITY_LOADING:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingCity:action.payload}

		case ACTION_TYPES.CITY_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,responseDataCity:action.payload,isLoadingCity:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
         
         responseDataCity: ''}
  		default:
  			return state;
	}

};
