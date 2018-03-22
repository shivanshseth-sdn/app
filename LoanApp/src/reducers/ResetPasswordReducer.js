import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {resetOldPassword:'',resetNewPassword: '', resetConfirmNewPassword:'',isLoadingResetPassword:false,resetPasswordRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){

		case ACTION_TYPES.RESET_OLD_PASSWORD:
			return {...state,resetOldPassword:action.payload}

		
		case ACTION_TYPES.RESET_PASSWORD:
			return {...state,resetNewPassword:action.payload}

		case ACTION_TYPES.RESET_CONFIRM_PASSWORD:
			return {...state,resetConfirmNewPassword:action.payload}


    case ACTION_TYPES.SHOW_LOADIN_RESET_PASSWORD:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingResetPassword:action.payload}

		case ACTION_TYPES.RESET_PASSWORD_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.resetPasswordRes);

			return {...state,resetPasswordRes:action.payload,isLoadingResetPassword:false}
	case ACTION_TYPES.CLEAR_RESPONSE:
     return {...state,   
       resetPasswordRes: ''}
		default:
			return state;
	}

};
