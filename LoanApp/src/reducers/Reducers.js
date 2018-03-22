import {combineReducers} from 'redux';
import SignUpReducer from './SignUpReducer';
import MobileVerifyReducer from './MobileVerifyReducer';
import LoginReducer from './LoginReducer';
import ForgotPassReducer from './ForgotPassReducer';
import UpdateUserInfoReducer from './UpdateUserInfoReducer';
import UpdateUserAddressInfoReducer from './UpdateUserAddressInfoReducer';
import UpdateUserDOBReducer from './UpdateUserDOBReducer';
import UpdateUserSSNReducer from './UpdateUserSSNReducer';
import ConnectBankReducer from './ConnectBankReducer';
import RepayCalculationReducer from './RepayCalculationReducer';
import ResendCodeReducer from './ResendCodeReducer';

import AgreementReducer from './AgreementReducer';
import RequestLoanDetailReducer from './RequestLoanDetailReducer';
import UpdateProfileReducer from './UpdateProfileReducer';

import CreateAccessPinReducer from './CreateAccessPinReducer';

import LoginWithAceessPinReducer from './LoginWithAceessPinReducer';

import ResetAccessPinReducer from './ResetAccessPinReducer';

import ForgotAccessPinReducer from './ForgotAccessPinReducer';

import FAQ_Reducer from './FAQ_Reducer';

import MyLoanReducer from './MyLoanReducer';

import ReferralValidateReducer from './ReferralValidateReducer';

import ResetPasswordReducer from './ResetPasswordReducer';

import GetCityReducer from './GetCityReducer';

import EarlyPaymentReducer from './EarlyPaymentReducer';

import GetLinkAccountReducer from './GetLinkAccountReducer';

import AddBankAccountByDwollaReducer from './AddBankAccountByDwollaReducer';

import AddAccountByPlaidReducer from './AddAccountByPlaidReducer';

import DeleteAccountReducer from './DeleteAccountReducer';
import GetStatesReducer from './GetStatesReducer';
import EmailSubscriptionReducer from './EmailSubscriptionReducer';

export default combineReducers({
	signup: SignUpReducer,
	mobileVerify: MobileVerifyReducer,
	loginUser: LoginReducer,
	forgotPass:ForgotPassReducer,
	updateUserInfo:UpdateUserInfoReducer,
	updateUserAddress:UpdateUserAddressInfoReducer,
	updateDOB:UpdateUserDOBReducer,
	updateSSN:UpdateUserSSNReducer,
	connectBank:ConnectBankReducer,
	reSendCodeReducer:ResendCodeReducer,
	repayCalculation:RepayCalculationReducer,
	agreementReducer:AgreementReducer,
	requestLoanDetailReducer:RequestLoanDetailReducer,
	updateProfileReducer:UpdateProfileReducer,
	createAccessPinReducer:CreateAccessPinReducer,
	loginWithAceessPinReducer:LoginWithAceessPinReducer,
	resetAccessPinReducer:ResetAccessPinReducer,
	rorgotAccessPinReducer:ForgotAccessPinReducer,
	faq_reducer:FAQ_Reducer,
	myLoanReducer:MyLoanReducer,
	referralValidateReducer:ReferralValidateReducer,
	resetPasswordReducer:ResetPasswordReducer,
	getCityReducer:GetCityReducer,
	earlyPaymentReducer:EarlyPaymentReducer,
	getLinkAccountReducer:GetLinkAccountReducer,
	addBankAccountByDwollaReducer:AddBankAccountByDwollaReducer,
	addAccountByPlaidReducer:AddAccountByPlaidReducer,
	deleteAccountReducer:DeleteAccountReducer,
	getStatesReducer:GetStatesReducer,
	emailSubscriptionReducer:EmailSubscriptionReducer
});
