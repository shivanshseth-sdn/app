const ACTION_TYPES = {
	EMAIL_CHANGED:'EMAIL_CHANGED',
	PASSWORD_CHANGED : 'PASSWORD_CHANGED',
  	CONFIRM_PASSWORD_CHANGED : 'CONFIRM_PASSWORD_CHANGED',
	SIGNUP_USER:'SIGNUP_USER',
	USERNAME_CHANGED:'USERNAME_CHANGED',
	LOGOUT_USER:'LOGOUT_USER',
	SHOW_LOADIN:'SHOW_LOADIN',
	SHOW_LOADIN_MOBILE_VERIFICATION:'SHOW_LOADIN_MOBILE_VERIFICATION',
	MOBILE_VERIFICATION:'MOBILE_VERIFICATION',
	MOBILE_VERIFICATION_REQ:'MOBILE_VERIFICATION_REQ',
	LOGIN_EMAIL_CHANGED:'LOGIN_EMAIL_CHANGED',
	LOGIN_PASSWORD_CHANGED:'LOGIN_PASSWORD_CHANGED',
	LOGIN_SHOW_LOADIN:'LOGIN_SHOW_LOADIN',
	LOGIN_USER:'LOGIN_USER',
	CLEAR_RESPONSE:'CLEAR_RESPONSE',
	FORGOT_PASS_EMAIL:'FORGOT_PASS_EMAIL',
	SHOW_LOADIN_FORGOT_PASS:'SHOW_LOADIN_FORGOT_PASS',
	FORGOT_PASS_REQ:'FORGOT_PASS_REQ',
	FACEBOOK_LOGIN_USER:'FACEBOOK_LOGIN_USER',
	UPDATE_USERNAME:'UPDATE_USERNAME',
	FIRST_NAME:'FIRST_NAME',
	LAST_NAME:'LAST_NAME',
	UPDATE_USER_NAME_SHOW_LOADIN:'UPDATE_USER_NAME_SHOW_LOADIN',

	USER_ADDRESS:'USER_ADDRESS',
	USER_CITY:'USER_CITY',
	USER_STATE:'USER_STATE',
	USER_ZIP:'USER_ZIP',
	UPDATE_ADDRESS_SHOW_LOADIN:'UPDATE_ADDRESS_SHOW_LOADIN',
	UPDATE_USER_ADDRESS:'UPDATE_USER_ADDRESS',

	USER_DOB:'USER_DOB',
	UPDATE_USER_DOB_SHOW_LOADIN:'UPDATE_USER_DOB_SHOW_LOADIN',
	UPDATE_DOB_WEB_CALL:'UPDATE_DOB_WEB_CALL',

	USER_SSN:'USER_SSN',
	UPDATE_USER_SSN_SHOW_LOADIN:'UPDATE_USER_SSN_SHOW_LOADIN',
	UPDATE_SSN_WEB_CALL:'UPDATE_SSN_WEB_CALL',

	CONNECT_BANK_SHOW_LOADIN:'CONNECT_BANK_SHOW_LOADIN',
	CONNECT_WEB_CALL:'CONNECT_WEB_CALL',

	REPAY_DATE1:'REPAY_DATE1',
	REPAY_DATE2:'REPAY_DATE2',
	REPAY_OPTION:'REPAY_OPTION',
	UPDATE_REPAY_SHOW_LOADIN:'UPDATE_REPAY_SHOW_LOADIN',
	REPAY_WEB_CALL:'REPAY_WEB_CALL',

	SHOW_LOADIN_RESEND_OTP:'SHOW_LOADIN_RESEND_OTP',
	_RESEND_OTP_REQ:'_RESEND_OTP_REQ',

	AGREEMENT_SHOW_LOADIN:'AGREEMENT_SHOW_LOADIN',
	AGREEMENT_WEB_CALL:'AGREEMENT_WEB_CALL',

	VERIFY_PHONE:'VERIFY_PHONE',
	SHOW_LOADIN_VERIFY_OTP:'SHOW_LOADIN_VERIFY_OTP',

	REQUEST_LOAN_DETAIL_SHOW_LOADIN:'REQUEST_LOAN_DETAIL_SHOW_LOADIN',
	REQUEST_LOAN_DETAIL_WEB_CALL:'REQUEST_LOAN_DETAIL_WEB_CALL',


	UPDATE_PROFILE_FIRST_NAME:'UPDATE_PROFILE_FIRST_NAME',
	UPDATE_PROFILE_LAST_NAME:'UPDATE_PROFILE_LAST_NAME',
	UPDATE_PROFILE_ADDRESS:'UPDATE_PROFILE_ADDRESS',
	UPDATE_PROFILE_CITY:'UPDATE_PROFILE_CITY',
	UPDATE_PROFILE_STATE:'UPDATE_PROFILE_STATE',
	UPDATE_PROFILE_ZIP:'UPDATE_PROFILE_ZIP',
	UPDATE_PROFILE_DOB:'UPDATE_PROFILE_DOB',
	UPDATE_PROFILE_PHONE:'UPDATE_PROFILE_PHONE',
	UPDATE_PROFILE_SHOW_LOADIN:'UPDATE_PROFILE_SHOW_LOADIN',
	UPDATE_PROFILE:'UPDATE_PROFILE',

	ACCESS_PIN:'ACCESS_PIN',
	CONFIRM_ACCESS_PIN:'CONFIRM_ACCESS_PIN',
	SHOW_LOADIN_ACCESS_PIN:'SHOW_LOADIN_ACCESS_PIN',
	CREATE_ACCESS_PIN:'CREATE_ACCESS_PIN',

	LOGIN_WITH_ACCESS_PIN:'LOGIN_WITH_ACCESS_PIN',
	SHOW_LOADIN_LOGIN_WITH_ACCESS_PIN:'SHOW_LOADIN_LOGIN_WITH_ACCESS_PIN',
	LOGIN_WITH_ACCESS_PIN_REQ:'LOGIN_WITH_ACCESS_PIN_REQ',

	RESET_OLD_PIN:'RESET_OLD_PIN',
	RESET_PIN:'RESET_PIN',
	RESET_CONFIRM_PIN:'RESET_CONFIRM_PIN',
	SHOW_LOADIN_RESET_PIN:'SHOW_LOADIN_RESET_PIN',
	RESET_PIN_REQ:'RESET_PIN_REQ',

	SHOW_LOADIN_FORGOT_PIN:'SHOW_LOADIN_FORGOT_PIN',
	FORGOT_ACCESS_PIN_REQ:'FORGOT_ACCESS_PIN_REQ',

	FAQ_LOADING:'FAQ_LOADING',
	FAQ_REQ:'FAQ_REQ',


	SHOW_LOADIN_MY_LOAN:'SHOW_LOADIN_MY_LOAN',
	MY_LOAN_REQ:'MY_LOAN_REQ',

	USER_ADDRESS2:'USER_ADDRESS2',
	UPDATE_PROFILE_ADDRESS2:'UPDATE_PROFILE_ADDRESS2',

	REQUEST_LOAN_DETAIL_SHOW_LOADIN_NEW:'REQUEST_LOAN_DETAIL_SHOW_LOADIN_NEW',

	REFERRAL_CODE_VALUE:'REFERRAL_CODE_VALUE',
	SHOW_LOADIN_REFERRAL:'SHOW_LOADIN_REFERRAL',
	REFERRAL_CODE_REQ:'REFERRAL_CODE_REQ',

	RESET_OLD_PASSWORD:'RESET_OLD_PASSWORD',
	RESET_PASSWORD:'RESET_PASSWORD',
	RESET_CONFIRM_PASSWORD:'RESET_CONFIRM_PASSWORD',
	SHOW_LOADIN_RESET_PASSWORD:'SHOW_LOADIN_RESET_PASSWORD',
	RESET_PASSWORD_REQ:'RESET_PASSWORD_REQ',

	CITY_LOADING:'CITY_LOADING',
	CITY_REQ:'CITY_REQ',

	SHOW_LOADIN_EARLY_PAYMENT:'SHOW_LOADIN_EARLY_PAYMENT',
	EARLY_PAYMENT_REQ:'EARLY_PAYMENT_REQ',

	SHOW_LOADIN_GET_BANK_ACCOUNT:'SHOW_LOADIN_GET_BANK_ACCOUNT',
	GET_BANK_ACCOUNT_REQ:'GET_BANK_ACCOUNT_REQ',

	LINK_ACCOUNT_SHOW_LOADIN:'LINK_ACCOUNT_SHOW_LOADIN',
	LINK_ACCOUNT_WEB_CALL:'LINK_ACCOUNT_WEB_CALL',

	ADD_BANK_SHOW_LOADIN:'ADD_BANK_SHOW_LOADIN',
	ADD_ACCOUNT_WEB_CALL:'ADD_ACCOUNT_WEB_CALL',

	SHOW_LOADIN_DELETE_ACCOUNT:'SHOW_LOADIN_DELETE_ACCOUNT',
	DELETE_ACCOUNT_REQ:'DELETE_ACCOUNT_REQ',

	STATES_LOADING:'STATES_LOADING',
	STATES_REQ:'STATES_REQ',

	EMAIL_SUBSCRIPTION_RES:'EMAIL_SUBSCRIPTION_RES',
	EMAIL_SUBSCRIPTION_LOADING:'EMAIL_SUBSCRIPTION_LOADING',

	REPAYMENT_OPTION_RES:'REPAYMENT_OPTION_RES',
	

}

export default ACTION_TYPES
