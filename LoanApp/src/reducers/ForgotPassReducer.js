import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {email: '',isLoading:false,forgotPassRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.FORGOT_PASS_EMAIL:
			return {...state,email:action.payload}

   case ACTION_TYPES.SHOW_LOADIN_FORGOT_PASS:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

	 case ACTION_TYPES.FORGOT_PASS_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,forgotPassRes:action.payload,isLoading:false}

	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		       forgotPassRes: '',
					 }
		default:
			return state;
	}

};
