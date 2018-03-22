import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {oldPin:'',pin: '', confirmPin:'',isLoadingResetPin:false,resetPinRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){

		case ACTION_TYPES.RESET_OLD_PIN:
			return {...state,oldPin:action.payload}

		
		case ACTION_TYPES.RESET_PIN:
			return {...state,pin:action.payload}

		case ACTION_TYPES.RESET_CONFIRM_PIN:
			return {...state,confirmPin:action.payload}


    case ACTION_TYPES.SHOW_LOADIN_RESET_PIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingResetPin:action.payload}

		case ACTION_TYPES.RESET_PIN_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.createPinRes);

			return {...state,resetPinRes:action.payload,isLoadingResetPin:false}
	case ACTION_TYPES.CLEAR_RESPONSE:
     return {...state,   
       resetPinRes: ''}
		default:
			return state;
	}

};
