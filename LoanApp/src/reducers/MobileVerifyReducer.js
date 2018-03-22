import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {phone: '',isLoading:false,mobileVerifyRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.MOBILE_VERIFICATION:
			return {...state,phone:action.payload}

   case ACTION_TYPES.SHOW_LOADIN_MOBILE_VERIFICATION:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

	 case ACTION_TYPES.MOBILE_VERIFICATION_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,mobileVerifyRes:action.payload,isLoading:false}

	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		     
		       mobileVerifyRes: '',
					 }
		default:
			return state;
	}

};
