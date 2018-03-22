import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {firstname: '', lastname:'',address:'',address2:'',city:'',state:'',zipcode:'',phone:'',dob:'',isLoading:false,responseData:''}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		case ACTION_TYPES.UPDATE_PROFILE_FIRST_NAME:
			return {...state,firstname:action.payload}

		case ACTION_TYPES.UPDATE_PROFILE_LAST_NAME:
			return {...state,lastname:action.payload}

    case ACTION_TYPES.UPDATE_PROFILE_ADDRESS:
      return {...state,address:action.payload}


      case ACTION_TYPES.UPDATE_PROFILE_ADDRESS2:
      return {...state,address2:action.payload}
  

    case ACTION_TYPES.UPDATE_PROFILE_CITY:
      return {...state,city:action.payload}

    case ACTION_TYPES.UPDATE_PROFILE_STATE:
      return {...state,state:action.payload}

    case ACTION_TYPES.UPDATE_PROFILE_ZIP:
      return {...state,zipcode:action.payload}

    case ACTION_TYPES.UPDATE_PROFILE_DOB:
      return {...state,dob:action.payload}

    case ACTION_TYPES.UPDATE_PROFILE_PHONE:
      return {...state,phone:action.payload}


    case ACTION_TYPES.UPDATE_PROFILE_SHOW_LOADIN:
        console.log('in loading red'+action.payload)
    		return {...state,isLoading:action.payload}

		case ACTION_TYPES.UPDATE_PROFILE:
			console.log('LOGIN_USER action.payload == '+action.payload.message);

			return {...state,responseData:action.payload,isLoading:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
         firstname: '',
         lastname: '',
         address:'',address2:'',city:'',state:'',zipcode:'',phone:'',dob:'',
         responseData: ''}
  		default:
  			return state;
	}

};
