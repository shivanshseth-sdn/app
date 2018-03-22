import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {firstname: '', lastname:'',isLoading:false,responseData:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.FIRST_NAME:
			return {...state,firstname:action.payload}

		case ACTION_TYPES.LAST_NAME:
			return {...state,lastname:action.payload}


    case ACTION_TYPES.UPDATE_USER_NAME_SHOW_LOADIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

		case ACTION_TYPES.UPDATE_USERNAME:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,responseData:action.payload,isLoading:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
                 responseData: ''}
  		default:
  			return state;
	}

};
