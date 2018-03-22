import ACTION_TYPES from './ActionType';
import URLS from './ConstantURL';

import {Actions} from 'react-native-router-flux';


export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.EMAIL_SUBSCRIPTION_LOADING,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const emailSubscription = ({authToken,userId,status}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('status id = '+ status);
  console.log('add other funding source Postdata JSON='+JSON.stringify({authToken,userId,status}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UPDATE_EMAIL_SUBS, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,status})
    })
    .then( (response) => {
      console.log('Received response emailSubscription: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from emailSubscription API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.EMAIL_SUBSCRIPTION_RES,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
