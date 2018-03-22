import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

export const showLoadingStates =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.STATES_LOADING,
      payload: value
    });
  }
};
export const clearResponseStates = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});


// Login Button Action
export const StatesReq = () => {


  console.log('FAQ received');


  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.GetUsState)
      .then( (response) => {
        console.log('Received response access pin: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from access pin: ', responseJSON);

        dispatch({
          type: ACTION_TYPES.STATES_REQ,
          payload: responseJSON
        });
    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
