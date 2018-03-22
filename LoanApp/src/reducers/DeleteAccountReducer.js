import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingDeleteAccount:false,responseDeleteAccount:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	
   case ACTION_TYPES.SHOW_LOADIN_DELETE_ACCOUNT:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingDeleteAccount:action.payload}

	 case ACTION_TYPES.DELETE_ACCOUNT_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,responseDeleteAccount:action.payload,isLoadingDeleteAccount:false}

	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		       responseDeleteAccount: '',
					 }
		default:
			return state;
	}

};
