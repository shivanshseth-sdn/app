import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoading:false,isLoadingVerifyOtp:false,mobileVerifyRes:'',verifyOtp:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	

   case ACTION_TYPES.SHOW_LOADIN_RESEND_OTP:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

    case ACTION_TYPES.SHOW_LOADIN_VERIFY_OTP:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingVerifyOtp:action.payload}		

	 case ACTION_TYPES._RESEND_OTP_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,mobileVerifyRes:action.payload,isLoading:false}


	 case ACTION_TYPES.VERIFY_PHONE:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,verifyOtp:action.payload,isLoadingVerifyOtp:false}		

	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		       phone: '',
		       mobileVerifyRes: '',
		       verifyOtp:''
					 }
		default:
			return state;
	}

};
