import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

export const showLoadingReferral =(value) => {
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_REFERRAL,
      payload: value
    });
  }
};
export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const validateReferralReq = ({authToken,userId,referralCode}) => {

  console.log('verify mobile button action received');
  console.log('verify Postdata JSON='+JSON.stringify({userId,referralCode}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.ReferralCoupon, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,referralCode})
    })
    .then( (response) => {
      console.log('Received response phoneVerification: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from phoneVerification API: ', responseJSON);

     dispatch({
        type: ACTION_TYPES.REFERRAL_CODE_REQ,
        payload: responseJSON
      });

    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
