import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {email: '',password:'',isLoading:false,loginRes:'',facebookRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.LOGIN_EMAIL_CHANGED:
			return {...state,email:action.payload}

		case ACTION_TYPES.LOGIN_PASSWORD_CHANGED:
			return {...state,password:action.payload}


    case ACTION_TYPES.LOGIN_SHOW_LOADIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

		case ACTION_TYPES.LOGIN_USER:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,loginRes:action.payload,isLoading:false}
			

		case ACTION_TYPES.FACEBOOK_LOGIN_USER:
				console.log('LOGIN_USER action.payload == '+action.payload.message);

				return {...state,facebookRes:action.payload,isLoading:false}


		case ACTION_TYPES.CLEAR_RESPONSE:
				     return {...state,
				      
				       loginRes: '',
							 facebookRes:''
							 }
		default:
			return state;
	}

};
