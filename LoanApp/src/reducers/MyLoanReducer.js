import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingMyLoan:false,myLoanRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
	
   case ACTION_TYPES.SHOW_LOADIN_MY_LOAN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingMyLoan:action.payload}

	 case ACTION_TYPES.MY_LOAN_REQ:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,myLoanRes:action.payload,isLoadingMyLoan:false}

	case ACTION_TYPES.CLEAR_RESPONSE:
		     return {...state,
		       myLoanRes: '',
					 }
		default:
			return state;
	}

};
