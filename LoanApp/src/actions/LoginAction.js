import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const loginEmailChanged = (text) => {
	return {
		type: ACTION_TYPES.LOGIN_EMAIL_CHANGED,
		payload: text
	};
};

// Password TextField Value Change
export const loginPasswordChanged = (text) => {
	return {
		type: ACTION_TYPES.LOGIN_PASSWORD_CHANGED,
		payload : text
	}
};

export const loginShowLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.LOGIN_SHOW_LOADIN,
      payload: value
    });
  }
};
export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});



// Login Button Action
export const loginUser = ({email,password,device_token,deviceId,deviceType,manufacturer,brand,model,systemName,systemVersion,uniqueID}) => {

  console.log("url=="+URLS.UserLogin);
  console.log('loginUser button action received');
  console.log('loginUser Postdata JSON='+JSON.stringify({email,password,device_token,deviceId,deviceType,manufacturer,brand,model,systemName,systemVersion,uniqueID}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UserLogin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password,device_token,deviceId,deviceType,manufacturer,brand,model,systemName,systemVersion,uniqueID})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.LOGIN_USER,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};

export const facebookLoginUser = ({firstname,lastname,email,facebook_id,deviceId,device_token,isFromSignup,deviceType}) => {

  console.log('loginUser button action received');
  console.log('loginUser Postdata JSON='+JSON.stringify({firstname,lastname,email,facebook_id,deviceId,device_token,isFromSignup,deviceType}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.FacebookUserLogin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstname,lastname,email,facebook_id,deviceId,device_token,isFromSignup,deviceType})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.FACEBOOK_LOGIN_USER,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
