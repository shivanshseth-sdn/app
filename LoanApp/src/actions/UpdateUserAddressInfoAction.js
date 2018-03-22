import ACTION_TYPES from './ActionType';

import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const addressChanged = (text) => {
	return {
		type: ACTION_TYPES.USER_ADDRESS,
		payload: text
	};
};


// Email Or Username TextField Value Change
export const addressChanged2 = (text) => {
  return {
    type: ACTION_TYPES.USER_ADDRESS2,
    payload: text
  };
};


// Password TextField Value Change
export const cityChanged = (text) => {
		console.log('selected city='+text);
	return {

		type: ACTION_TYPES.USER_CITY,
		payload : text
	}
};
export const stateChanged = (text) => {
	return {
		type: ACTION_TYPES.USER_STATE,
		payload : text
	}
};
export const zipChanged = (text) => {
	return {
		type: ACTION_TYPES.USER_ZIP,
		payload : text
	}
};
export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_ADDRESS_SHOW_LOADIN,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});


// Login Button Action
export const updateUserAddress= ({authToken,userId,address1,address2,state,city,zipcode}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,address1,address2,state,city,zipcode}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UpdateBasicDetails, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,address1,address2,state,city,zipcode})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.UPDATE_USER_ADDRESS,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
