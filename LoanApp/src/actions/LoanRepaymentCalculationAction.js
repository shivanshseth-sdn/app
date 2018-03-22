import ACTION_TYPES from './ActionType';

import {Actions} from 'react-native-router-flux';
import URLS from './ConstantURL';

// Email Or Username TextField Value Change
export const repayDate1Changed = (text) => {
	return {
		type: ACTION_TYPES.REPAY_DATE1,
		payload: text
	};
};

export const repayDate2Changed = (text) => {
	return {
		type: ACTION_TYPES.REPAY_DATE2,
		payload: text
	};
};





export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_REPAY_SHOW_LOADIN,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});



// Login Button Action
export const repayCalculation = ({authToken,userId,loan_amt,repaymentOption,loanId,repaymentDate1,repaymentDate2}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,loan_amt,repaymentOption,loanId,repaymentDate1,repaymentDate2}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.LoanRepaymentCalculation, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,loan_amt,repaymentOption,loanId,repaymentDate1,repaymentDate2})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.REPAY_WEB_CALL,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};



export const getLoanRepaymentOption = (authToken) => {


  console.log('getLoanRepaymentOption ==',authToken);


  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.GET_REPAYMENT_OPTION , {
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+authToken,
        },
    
      })
      .then( (response) => {
 
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from getLoanRepaymentOption: ', JSON.stringify(responseJSON));

        dispatch({
          type: ACTION_TYPES.REPAYMENT_OPTION_RES,
          payload: responseJSON
        });
    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};

