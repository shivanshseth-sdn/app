import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingEarlyPayment:false, earlyPaymentRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	

   case ACTION_TYPES.SHOW_LOADIN_EARLY_PAYMENT:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingEarlyPayment:action.payload}

   

	 case ACTION_TYPES.EARLY_PAYMENT_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,earlyPaymentRes:action.payload,isLoadingEarlyPayment:false}


	
	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		    
		       earlyPaymentRes: '',
		      
					 }
		default:
			return state;
	}

};
