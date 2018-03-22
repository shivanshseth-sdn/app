import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const forgotPassEmailChanged = (text) => {
	return {
		type: ACTION_TYPES.FORGOT_PASS_EMAIL,
		payload: text
	};
};

export const showLoadingForgotPass =(value) => {
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_FORGOT_PASS,
      payload: value
    });
  }
};
export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const forgotPassReq = ({email}) => {

  console.log('verify mobile button action received');
  console.log('verify Postdata JSON='+JSON.stringify({email}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.ForgotPassword, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email})
    })
    .then( (response) => {
      console.log('Received response phoneVerification: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from phoneVerification API: ', responseJSON);

     dispatch({
        type: ACTION_TYPES.FORGOT_PASS_REQ,
        payload: responseJSON
      });

    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
