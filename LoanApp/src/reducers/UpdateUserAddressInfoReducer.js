import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {address: '',address2:'', states:'',city:'',zip:'',isLoading:false,responseData:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.USER_ADDRESS:
    
      console.log('in address'+action.payload)
			return {...state,address:action.payload}

     case ACTION_TYPES.USER_ADDRESS2:
    
      console.log('in address2'+action.payload)
      return {...state,address2:action.payload} 

		case ACTION_TYPES.USER_STATE:
		  console.log('in state'+action.payload)
			return {...state,states:action.payload}

    case ACTION_TYPES.USER_CITY:
			console.log('in city'+action.payload)
      return {...state,city:action.payload}

    case ACTION_TYPES.USER_ZIP:
        return {...state,zip:action.payload}

    case ACTION_TYPES.UPDATE_ADDRESS_SHOW_LOADIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

		case ACTION_TYPES.UPDATE_USER_ADDRESS:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,responseData:action.payload,isLoading:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
        
         responseData: ''}
  		default:
  			return state;
	}

};
