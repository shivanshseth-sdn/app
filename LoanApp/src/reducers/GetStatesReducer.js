import ACTION_TYPES from '../actions/ActionType';
const INITIAL_STATE = {isLoadingStates:false,responseDataStates:''}

export default  (state = INITIAL_STATE, action) => {

  switch(action.type){

    case ACTION_TYPES.STATES_LOADING:
        console.log('in loading red'+action.payload)
        return {...state,isLoadingStates:action.payload}

    case ACTION_TYPES.STATES_REQ:
      console.log('LOGIN_USER action.payload == '+action.payload.message);

      return {...state,responseDataStates:action.payload,isLoadingStates:false}

    case ACTION_TYPES.CLEAR_RESPONSE:
       return {...state,
         
         responseDataStates: ''}
      default:
        return state;
  }

};
