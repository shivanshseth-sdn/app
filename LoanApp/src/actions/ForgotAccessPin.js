import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';
export const forgotPinShowLoading =(value) => {
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_FORGOT_PIN,
      payload: value
    });
  }
};


export const clearResponseForgotPin = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});




// Login Button Action
export const forgotAccessPinReq = ({userId,pin_sort_id,deviceId,deviceType,deviceToken}) => {


  console.log('Login button action received');
  console.log('Login Postdata JSON='+JSON.stringify({userId,pin_sort_id,deviceId,deviceType,deviceToken}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.ForgotPin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify({userId,pin_sort_id,deviceId,deviceType,deviceToken})
    })
    .then( (response) => {
      console.log('Received response access pin: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from access pin: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.FORGOT_ACCESS_PIN_REQ,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
