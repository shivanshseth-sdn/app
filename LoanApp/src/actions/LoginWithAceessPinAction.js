import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const pinChangedLogin = (text) => {
	return {
		type: ACTION_TYPES.LOGIN_WITH_ACCESS_PIN,
		payload: text
	};
};



export const showLoadingLoginPin =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_LOGIN_WITH_ACCESS_PIN,
      payload: value
    });
  }
};
export const clearResponseLoginPin = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});



// Login Button Action
export const LoginWithPin = ({userId,pin_sort_id,access_pin,deviceId,deviceType,deviceToken}) => {

  
  console.log('Login button action received');
  console.log('Login Postdata JSON='+JSON.stringify({userId,pin_sort_id,access_pin,deviceId,deviceType,deviceToken}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UserLoginWithPin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
     
      },
      body: JSON.stringify({userId,pin_sort_id,access_pin,deviceId,deviceType,deviceToken})
    })
    .then( (response) => {
      console.log('Received response access pin: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from access pin: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.LOGIN_WITH_ACCESS_PIN_REQ,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
