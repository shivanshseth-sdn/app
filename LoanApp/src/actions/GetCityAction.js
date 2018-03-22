import ACTION_TYPES from './ActionType';
import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

export const showLoadingCity =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.CITY_LOADING,
      payload: value
    });
  }
};
export const clearResponseCity = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});


// Login Button Action
export const CityReq = () => {


  console.log('FAQ received');


  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.GetFloridaCity)
      .then( (response) => {
        console.log('Received response access pin: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from access pin: ', responseJSON);

        dispatch({
          type: ACTION_TYPES.CITY_REQ,
          payload: responseJSON
        });
    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
