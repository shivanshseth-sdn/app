import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {email: '', password:'',confirmPass:'',isLoadingSignUp:false,signupRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.EMAIL_CHANGED:
			return {...state,email:action.payload}

		case ACTION_TYPES.PASSWORD_CHANGED:
			return {...state,password:action.payload}

    case ACTION_TYPES.CONFIRM_PASSWORD_CHANGED:
  		return {...state,confirmPass:action.payload}

    case ACTION_TYPES.SHOW_LOADIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingSignUp:action.payload}

		case ACTION_TYPES.SIGNUP_USER:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,signupRes:action.payload,isLoadingSignUp:false}
	case ACTION_TYPES.CLEAR_RESPONSE:
     return {...state,   
       signupRes: ''}
		default:
			return state;
	}

};
