import ACTION_TYPES from './ActionType';
import URLS from './ConstantURL';
import {Actions} from 'react-native-router-flux';


export const showLoadingDeleteAccount =(value) => {
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SHOW_LOADIN_DELETE_ACCOUNT,
      payload: value
    });
  }
};
export const clearResponseDeleteAccount = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const deleteAccountReq = ({authToken,userId,id}) => {

  console.log('verify mobile button action received');
  console.log('verify Postdata JSON='+JSON.stringify({userId,id}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.DeleteBankAccount, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,id})
    })
    .then( (response) => {
      console.log('Received response phoneVerification: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from phoneVerification API: ', responseJSON);

     dispatch({
        type: ACTION_TYPES.DELETE_ACCOUNT_REQ,
        payload: responseJSON
      });

    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
