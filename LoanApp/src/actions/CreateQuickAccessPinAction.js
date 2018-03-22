import ACTION_TYPES from './ActionType';
import URLS from './ConstantURL';
import {Actions} from 'react-native-router-flux';


// Email Or Username TextField Value Change
export const pinChanged = (text) => {
	return {
		type: ACTION_TYPES.ACCESS_PIN,
		payload: text
	};
};

// Password TextField Value Change
export const confirmPinChanged = (text) => {
	return {
		type: ACTION_TYPES.CONFIRM_ACCESS_PIN,
		payload : text
	}
};

export const showLoadingCreatePin =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_ACCESS_PIN,
      payload: value
    });
  }
};
export const clearResponseCreatePin = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const CreatePin = ({authToken,userId,access_pin,deviceId}) => {

  console.log('auth token= '+ authToken);
  console.log('Login button action received');
  console.log('Login Postdata JSON='+JSON.stringify({userId,access_pin,deviceId}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.CreateQuickAccessPin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,access_pin,deviceId})
    })
    .then( (response) => {
      console.log('Received response access pin: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from access pin: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.CREATE_ACCESS_PIN,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
