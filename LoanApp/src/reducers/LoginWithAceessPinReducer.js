import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {pin: '',isLoadingLoginPin:false,loginPinRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.LOGIN_WITH_ACCESS_PIN:
			return {...state,pin:action.payload}

		case ACTION_TYPES.CONFIRM_ACCESS_PIN:
			return {...state,confirmPin:action.payload}


	    case ACTION_TYPES.SHOW_LOADIN_LOGIN_WITH_ACCESS_PIN:
	        console.log('in loading red'+action.payload)
	    		return {...state,isLoadingLoginPin:action.payload}

		case ACTION_TYPES.LOGIN_WITH_ACCESS_PIN_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.loginPinRes);

			return {...state,loginPinRes:action.payload,isLoadingLoginPin:false}

		case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,   
		       			loginPinRes: ''}
		
		default:
			return state;
	}

};
