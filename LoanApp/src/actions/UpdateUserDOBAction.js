import ACTION_TYPES from './ActionType';

import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const dobChanged = (text) => {
	return {
		type: ACTION_TYPES.USER_DOB,
		payload: text
	};
};



export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_USER_DOB_SHOW_LOADIN,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const updateDOB = ({authToken,userId,dob}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,dob}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UpdateDob, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,dob})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.UPDATE_DOB_WEB_CALL,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
