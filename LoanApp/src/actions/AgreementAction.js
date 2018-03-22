import ACTION_TYPES from './ActionType';
import URLS from './ConstantURL';

import {Actions} from 'react-native-router-flux';




export const showLoading =(value)=>{
  console.log('in loading='+ value);
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.AGREEMENT_SHOW_LOADIN,
      payload: value
    });
  }
};

export const clearResponse = () => ({
  type: ACTION_TYPES.CLEAR_RESPONSE
});


// Login Button Action
export const agreementReqCall = ({authToken,userId,loanTypeId,name,phone,loan_amt,processingFees,rateOfIntrest,repaymentOption,repaymentDate1,repaymentDate2,repaymentamt1,repaymentamt2,totalRepayment,bankrollAgreement,termsAndCondition,authorization,agreement_signed,latitude,longitude}) => {

  console.log('auth token= '+ authToken);
  console.log('user id = '+ userId);
  console.log('update Postdata JSON='+JSON.stringify({userId,loanTypeId,name,phone,loan_amt,processingFees,rateOfIntrest,repaymentOption,repaymentDate1,repaymentDate2,repaymentamt1,repaymentamt2,totalRepayment,bankrollAgreement,termsAndCondition,authorization,agreement_signed,latitude,longitude}));

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(URLS.RequestForLoan, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
      body: JSON.stringify({userId,loanTypeId,name,phone,loan_amt,processingFees,rateOfIntrest,repaymentOption,repaymentDate1,repaymentDate2,repaymentamt1,repaymentamt2,totalRepayment,bankrollAgreement,termsAndCondition,authorization,agreement_signed,latitude,longitude})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type: ACTION_TYPES.AGREEMENT_WEB_CALL,
        payload: responseJSON
      });


    })
    .catch(e => {
      console.log('Error==='+e);
    });
  }

};
