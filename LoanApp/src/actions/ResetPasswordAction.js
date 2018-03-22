import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const oldPasswordChanged = (text) => {
  return {
    type: ACTION_TYPES.RESET_OLD_PASSWORD,
    payload: text
  };
};

// Email Or Username TextField Value Change
export const resetPasswordChanged = (text) => {
	return {
		type: ACTION_TYPES.RESET_PASSWORD,
		payload: text
	};
};

// Password TextField Value Change
export const resetConfirmPasswordChanged = (text) => {
	return {
		type: ACTION_TYPES.RESET_CONFIRM_PASSWORD,
		payload : text
	}
};

export const showLoadingResetPassword =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_RESET_PASSWORD,
      payload: value
    });
  }
};
export const clearResponseResetPassword = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});


 
// Login Button Action
export const ResetPasswordReq = ({authToken,oldPassword,newPassword,confirmPassword,userId,deviceId,deviceType,deviceToken}) => {

   console.log('auth token= '+ authToken);
  console.log('Login button action received');
  console.log('Login Postdata JSON='+JSON.stringify({oldPassword,newPassword,confirmPassword,userId,deviceId,deviceType,deviceToken}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.ResetPassword, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
       
      },
      body: JSON.stringify({oldPassword,newPassword,confirmPassword,userId,deviceId,deviceType,deviceToken})
    })
    .then( (response) => {
      console.log('Received response access pin: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from access pin: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.RESET_PASSWORD_REQ,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
