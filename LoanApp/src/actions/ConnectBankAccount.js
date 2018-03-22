import ACTION_TYPES from './ActionType';
import URLS from './ConstantURL';

import {Actions} from 'react-native-router-flux';


export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.CONNECT_BANK_SHOW_LOADIN,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const connectBank = ({authToken,userId,token,accountId,metadata}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,token,accountId,metadata}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.Accesstoken, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,token,accountId,metadata})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.CONNECT_WEB_CALL,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
