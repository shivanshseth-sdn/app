import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingForgotPIn:false,forgotPinRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	

   case ACTION_TYPES.SHOW_LOADIN_FORGOT_PIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingForgotPIn:action.payload}


	 case ACTION_TYPES.FORGOT_ACCESS_PIN_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,forgotPinRes:action.payload,isLoadingForgotPIn:false}


	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		
		       forgotPinRes:''
					 }
		default:
			return state;
	}

};
