import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingLinkAccount:false, linkedAccountRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	

   case ACTION_TYPES.SHOW_LOADIN_GET_BANK_ACCOUNT:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingLinkAccount:action.payload}

   

	 case ACTION_TYPES.GET_BANK_ACCOUNT_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,linkedAccountRes:action.payload,isLoadingLinkAccount:false}


	
	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		    
		       linkedAccountRes: '',
		      
					 }
		default:
			return state;
	}

};
