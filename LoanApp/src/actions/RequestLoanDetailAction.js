import ACTION_TYPES from './ActionType';

import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';





export const showLoading =(value)=>{
  console.log('in loading new='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.REQUEST_LOAN_DETAIL_SHOW_LOADIN_NEW,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});



// Login Button Action
export const getLoanDetail = ({authToken,userId,id}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,id}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.Requestloandetail, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,id})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.REQUEST_LOAN_DETAIL_WEB_CALL,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
