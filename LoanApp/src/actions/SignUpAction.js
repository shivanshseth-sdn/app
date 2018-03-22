import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const emailChanged = (text) => {
	return {
		type: ACTION_TYPES.EMAIL_CHANGED,
		payload: text
	};
};

// Password TextField Value Change
export const passwordChanged = (text) => {
	return {
		type: ACTION_TYPES.PASSWORD_CHANGED,
		payload : text
	}
};
// Password TextField Value Change
export const confirmPasswordChanged = (text) => {
	return {
		type: ACTION_TYPES.CONFIRM_PASSWORD_CHANGED,
		payload : text
	}
};
export const showLoadingSignUp =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN,
      payload: value
    });
  }
};
export const clearResponseSignUp = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const signupUser = ({email,password,deviceId,deviceType,deviceToken,manufacturer,brand,model,systemName,systemVersion,uniqueID}) => {

  console.log('Login button action received');
  console.log('Login Postdata JSON='+JSON.stringify({email,password,deviceId,deviceType,deviceToken,manufacturer,brand,model,systemName,systemVersion,uniqueID}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UserRegister, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password,deviceId,deviceType,deviceToken,manufacturer,brand,model,systemName,systemVersion,uniqueID})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.SIGNUP_USER,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
