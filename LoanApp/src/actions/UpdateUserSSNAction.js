import ACTION_TYPES from './ActionType';

import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const ssnChanged = (text) => {
	return {
		type: ACTION_TYPES.USER_SSN,
		payload: text
	};
};

export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_USER_SSN_SHOW_LOADIN,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const updateSSN = ({authToken,userId,ssn}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,ssn}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UpdateSsn, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,ssn})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.UPDATE_SSN_WEB_CALL,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
