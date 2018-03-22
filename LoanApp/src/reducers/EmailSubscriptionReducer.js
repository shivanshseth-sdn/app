import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoading:false,emailSubRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	


    	case ACTION_TYPES.EMAIL_SUBSCRIPTION_LOADING:
       
    		return {...state,isLoading:action.payload}

		case ACTION_TYPES.EMAIL_SUBSCRIPTION_RES:
			

			return {...state,emailSubRes:action.payload,isLoading:false}
			
		case ACTION_TYPES.CLEAR_RESPONSE:
				     return {...state,
				      
				       			loginRes: '',
							
							 }
		default:
			return state;
	}

};
