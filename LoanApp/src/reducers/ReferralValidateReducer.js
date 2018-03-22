import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingReferral:false,responseData:''}

export default  (state = INITIAL_STATE, action) => {

  switch(action.type){
   
    case ACTION_TYPES.SHOW_LOADIN_REFERRAL:
        console.log('in loading red'+action.payload)
        return {...state,isLoadingReferral:action.payload}

    case ACTION_TYPES.REFERRAL_CODE_REQ:
      console.log('LOGIN_USER action.payload == '+action.payload.message);

      return {...state,responseData:action.payload,isLoadingReferral:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
      
         responseData: ''}
      default:
        return state;
  }

};
