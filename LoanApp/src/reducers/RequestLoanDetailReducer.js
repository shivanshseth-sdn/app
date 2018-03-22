import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingLoanDetail:false,responseData:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){

    case ACTION_TYPES.REQUEST_LOAN_DETAIL_SHOW_LOADIN_NEW:
        console.log('in loading red'+action.payload)
    		return {...state,isLoadingLoanDetail:action.payload}

		case ACTION_TYPES.REQUEST_LOAN_DETAIL_WEB_CALL:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,responseData:action.payload,isLoadingLoanDetail:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
         
         responseData: ''}
  		default:
  			return state;
	}

};
