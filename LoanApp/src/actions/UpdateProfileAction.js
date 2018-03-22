import ACTION_TYPES from './ActionType';

import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const firstNameChanged = (text) => {
	return {
		type: ACTION_TYPES.UPDATE_PROFILE_FIRST_NAME,
		payload: text
	};
};

// Password TextField Value Change
export const lastNameChanged = (text) => {
	return {
		type: ACTION_TYPES.UPDATE_PROFILE_LAST_NAME,
		payload : text
	}
};

export const addressChanged = (text) => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_ADDRESS,
    payload : text
  }
};

export const addressChanged2 = (text) => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_ADDRESS2,
    payload : text
  }
};

export const cityChanged = (text) => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_CITY,
    payload : text
  }
};

export const stateChanged = (text) => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_STATE,
    payload : text
  }
};

export const zipChanged = (text) => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_ZIP,
    payload : text
  }
};

export const dobChanged = (text) => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_DOB,
    payload : text
  }
};

export const phoneChanged = (text) => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_PHONE,
    payload : text
  }
};

export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_PROFILE_SHOW_LOADIN,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});

// Login Button Action
export const updateUserProfile = ({authToken,userId,firstname,lastname,contact,address1,address2,isPhoneNew,zipcode,city,state,dob}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,firstname,lastname,contact,address1,address2,isPhoneNew,zipcode,city,state,dob}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.UpdateProfile, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,firstname,lastname,contact,address1,address2,isPhoneNew,zipcode,city,state,dob})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.UPDATE_PROFILE,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
