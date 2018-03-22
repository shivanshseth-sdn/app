import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {pin: '', confirmPin:'',isLoadingCreatePin:false,createPinRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.ACCESS_PIN:
			return {...state,pin:action.payload}

		case ACTION_TYPES.CONFIRM_ACCESS_PIN:
			return {...state,confirmPin:action.payload}


    case ACTION_TYPES.SHOW_LOADIN_ACCESS_PIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingCreatePin:action.payload}

		case ACTION_TYPES.CREATE_ACCESS_PIN:
			console.log('LOGIN_USER action.payload == '+action.payload.createPinRes);

			return {...state,createPinRes:action.payload,isLoadingCreatePin:false}
	case ACTION_TYPES.CLEAR_RESPONSE:
     return {...state,   
       createPinRes: ''}
		default:
			return state;
	}

};
