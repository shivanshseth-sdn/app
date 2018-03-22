import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingLinkAccountDwolla:false, linkedAccountDwollaRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	

   case ACTION_TYPES.LINK_ACCOUNT_SHOW_LOADIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingLinkAccountDwolla:action.payload}

   

	 case ACTION_TYPES.LINK_ACCOUNT_WEB_CALL:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,linkedAccountDwollaRes:action.payload,isLoadingLinkAccountDwolla:false}


	
	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		    
		       linkedAccountDwollaRes: '',
		      
					 }
		default:
			return state;
	}

};
