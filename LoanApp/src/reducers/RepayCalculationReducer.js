import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {repayDate1: '',repayDate2: '', isLoading:false,responseData:'',repayOptionRes:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.REPAY_DATE1:
			return {...state,repayDate1:action.payload}

    case ACTION_TYPES.REPAY_DATE2:
  		return {...state,repayDate2:action.payload}



    case ACTION_TYPES.UPDATE_REPAY_SHOW_LOADIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

    case ACTION_TYPES.REPAY_WEB_CALL:
    

      return {...state,responseData:action.payload,isLoading:false}
	
  	case ACTION_TYPES.REPAYMENT_OPTION_RES:
	
			return {...state,repayOptionRes:action.payload,isLoading:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
       
         responseData: '',repayOptionRes:''}
  		default:
  			return state;
	}

};
