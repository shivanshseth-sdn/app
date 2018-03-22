import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoading:false,responseData:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){

    case ACTION_TYPES.FAQ_LOADING:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

		case ACTION_TYPES.FAQ_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,responseData:action.payload,isLoading:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
         
         responseData: ''}
  		default:
  			return state;
	}

};
