import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const oldPinChanged = (text) => {
  return {
    type: ACTION_TYPES.RESET_OLD_PIN,
    payload: text
  };
};

// Email Or Username TextField Value Change
export const pinChangedReset = (text) => {
	return {
		type: ACTION_TYPES.RESET_PIN,
		payload: text
	};
};

// Password TextField Value Change
export const confirmPinChangedReset = (text) => {
	return {
		type: ACTION_TYPES.RESET_CONFIRM_PIN,
		payload : text
	}
};

export const showLoadingResetPin =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_RESET_PIN,
      payload: value
    });
  }
};
export const clearResponseResetPin = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});




// Login Button Action
export const ResetPinReq = ({oldPin,newPin,userId,pin_sort_id,deviceId,deviceType,deviceToken}) => {


  console.log('Login button action received');
  console.log('Login Postdata JSON='+JSON.stringify({oldPin,newPin,userId,pin_sort_id,deviceId,deviceType,deviceToken}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.ResetPin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify({oldPin,newPin,userId,pin_sort_id,deviceId,deviceType,deviceToken})
    })
    .then( (response) => {
      console.log('Received response access pin: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from access pin: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.RESET_PIN_REQ,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
