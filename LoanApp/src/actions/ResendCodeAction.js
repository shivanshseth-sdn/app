import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';
export const resendCodeShowLoadingMobileVerification =(value) => {
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_RESEND_OTP,
      payload: value
    });
  }
};

export const resendCodeShowLoadingVerifyOtp =(value) => {
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_VERIFY_OTP,
      payload: value
    });
  }
};
export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const verifyPhone = ({authToken,phone,userId}) => {

  console.log('verify mobile button action received');
  console.log('verify Postdata JSON='+JSON.stringify({phone,userId}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UpdatePhoneNumber, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({phone,userId})
    })
    .then( (response) => {
      console.log('Received response opt verify: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from otp verify: ', responseJSON);

     dispatch({
        type: ACTION_TYPES.VERIFY_PHONE,
        payload: responseJSON
      });

    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};

// Login Button Action
export const resendOTPCall = ({phone}) => {

  console.log('verify mobile button action received');
  console.log('verify Postdata JSON='+JSON.stringify({phone}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.PhoneVerification, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone})
    })
    .then( (response) => {
      console.log('Received response phoneVerification: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from phoneVerification API: ', responseJSON);

     dispatch({
        type: ACTION_TYPES._RESEND_OTP_REQ,
        payload: responseJSON
      });

    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
