/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers/Reducers';
import ReduxThunk from 'redux-thunk';
import{ Router,Scene,Actions,ActionConst} from 'react-native-router-flux';
import Splash from './src/components/Splash';
import LoginComponent from './src/components/LoginComponent';
import ForgotPassword from './src/components/ForgotPassword';
import SignUp from './src/components/SignUp';
import Slider from './src/components/Slider';
import Dashboard from './src/components/Dashboard';
import Profile from './src/components/Profile';
import EnterVrificationCode from './src/components/EnterVrificationCode';
import VerifyPhoneNumber from './src/components/VerifyPhoneNumber';
import RequestLoanAmountStep1 from './src/components/RequestLoanAmountStep1';
import RequestLoanAmountStep2 from './src/components/RequestLoanAmountStep2';
import RequestLoanAmountStep3 from './src/components/RequestLoanAmountStep3';
import RequestLoanAmountStep4 from './src/components/RequestLoanAmountStep4';
import AddBankAccount from './src/components/AddBankAccount';
import Congrats from './src/components/Congrats';
import Support from './src/components/Support';
import Referals from './src/components/Referals';
import DynamicList from './src/components/DynamicList';
import MyLoan from './src/components/MyLoan';
import MyLoanDetail from './src/components/MyLoanDetail';
import Account from './src/components/Account';
import SelectLoanAmount from './src/components/SelectLoanAmount';
import RepaymentSchedule from './src/components/RepaymentSchedule';
import CalculatedTotalLoan from './src/components/CalculatedTotalLoan';
import Agreement from './src/components/Agreement';
import ReferralCode from './src/components/ReferralCode';
import CompleteReferralCode from './src/components/CompleteReferralCode';


import CreateAccessPin from './src/components/CreateAccessPin';
import FAQ from './src/components/FAQ';
import ResetPin from './src/components/ResetPin';
import CreateNewPin from './src/components/CreateNewPin';

import PlaidView from './src/components/PlaidView';
import RequestedLoanDetailNew from './src/components/RequestedLoanDetailNew';
import SettingComponent from './src/components/SettingComponent';

import DwollaComponent from './src/components/DwollaComponent';
import AddBankAccountByDwolla from './src/components/AddBankAccountByDwolla';
import AddAccountByPlaid from './src/components/AddAccountByPlaid';

export default class LoanApp extends Component {
  render() {
    return (

  <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
       <Router>
         <Scene key="root">
           <Scene key="Splash" component={Splash} title="Splash"
           hideNavBar={true}
           initial
           />

           <Scene key="Slider" component={Slider}
           hideNavBar={true}
           />

           <Scene key="LoginComponent" component={LoginComponent} title="LOGIN"
             hideNavBar={false}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             navigationBarStyle={styles.navBar}
             titleStyle={styles.navBarTitle}
             onBack={()=>Actions.Slider({type: "reset"})} 
             backButtonImage={require('./src/res/back.png')}
             
           />
           <Scene key="ForgotPassword" component={ForgotPassword} title="RESET PASSWORD"
             hideNavBar={false}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             navigationBarStyle={styles.navBar}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="SignUp" component={SignUp} title="LET'S GET STARTED"
             hideNavBar={false}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             navigationBarStyle={styles.navBar}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="VerifyPhoneNumber" component={VerifyPhoneNumber} title="VERIFY NUMBER"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="EnterVrificationCode" component={EnterVrificationCode} title="ENTER YOUR CODE"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
            backButtonImage={require('./src/res/back.png')}
           />

             <Scene key="ReferralCode" component={ReferralCode} title="REFERRAL"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

           <Scene key="CreateAccessPin" component={CreateAccessPin} title="QUICK ACCESS"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

            <Scene key="ResetPin" component={ResetPin} title="RESET PIN"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

            <Scene key="CreateNewPin" component={CreateNewPin} title="QUICK ACCESS"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

            <Scene key="CompleteReferralCode" component={CompleteReferralCode} title="REFERRAL"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

           
           

           <Scene key="Dashboard" component={Dashboard}
             hideNavBar={true}
             

           />
           <Scene key="Profile" component={Profile} title="MY PROFILE"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
          
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="MyLoan" component={MyLoan} title="MY LOAN"
             hideNavBar={false}
            navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
            backButtonImage={require('./src/res/back.png')}
           />

            <Scene key="FAQ" component={FAQ} title="FAQ"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="MyLoanDetail" component={MyLoanDetail} title="MY LOAN"
             hideNavBar={false}
            navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="Account" component={Account} title="LINKED ACCOUNTS"
             hideNavBar={false}
            navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />




           <Scene key="RequestLoanAmountStep1" component={RequestLoanAmountStep1} title="CREATE LOGIN"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="RequestLoanAmountStep2" component={RequestLoanAmountStep2} title="CREATE LOGIN"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="RequestLoanAmountStep3" component={RequestLoanAmountStep3} title="VERIFY ID"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="RequestLoanAmountStep4" component={RequestLoanAmountStep4} title="VERIFY ID"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />


           <Scene key="AddBankAccount" component={AddBankAccount} title="LINK ACCOUNT"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

             <Scene key="PlaidView" component={PlaidView} title="LINK ACCOUNT"
             hideNavBar={true}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

           <Scene key="Congrats" component={Congrats}
             hideNavBar={true}

           />
           <Scene key="Support" component={Support} title="SUPPORT"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />
           <Scene key="Referals" component={Referals} title="REFERRALS"
             hideNavBar={false}
              navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

           <Scene key="SelectLoanAmount" component={SelectLoanAmount} title="ACCOUNT"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

           <Scene key="RepaymentSchedule" component={RepaymentSchedule} title="ACCOUNT"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

           <Scene key="CalculatedTotalLoan" component={CalculatedTotalLoan} title="ACCOUNT"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
            backButtonImage={require('./src/res/back.png')}
           />

         

            <Scene key="RequestedLoanDetailNew" component={RequestedLoanDetailNew} title="ACCOUNT"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
            backButtonImage={require('./src/res/back.png')}
           />



           <Scene key="Agreement" component={Agreement} title="AGREEMENTS"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />


           <Scene key="SettingComponent" component={SettingComponent} title="SETTINGS"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />

            <Scene key="DwollaComponent" component={DwollaComponent} title="LINK ACCOUNT"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             onBack={()=>Actions.Dashboard({type: "reset"})} 
             backButtonImage={require('./src/res/back.png')}
           />

           
          <Scene key="AddBankAccountByDwolla" component={AddBankAccountByDwolla} title="LINK ACCOUNT"
             hideNavBar={false}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             onBack={()=>Actions.Dashboard({type: "reset"})} 
             backButtonImage={require('./src/res/back.png')}
           />

          <Scene key="AddAccountByPlaid" component={AddAccountByPlaid} title="LINK ACCOUNT"
             hideNavBar={true}
             navigationBarStyle={styles.navBar}
             navigationBarBackgroundImage={require('./src/res/header.png')}
              navigationBarBackgroundImageStyle={styles.backImage}
             titleStyle={styles.navBarTitle}
             backButtonImage={require('./src/res/back.png')}
           />



           <Scene key="DynamicList" component={DynamicList}
           hideNavBar={true}
           navigationBarBackgroundImage={require('./src/res/header.png')}
            navigationBarBackgroundImageStyle={styles.backImage}
           titleStyle={styles.navBarTitle}
           backButtonImage={require('./src/res/back.png')}

           />

        </Scene>
       </Router>
    </Provider>
    );
  }
}
const styles = StyleSheet.create({
  navBar: {
  justifyContent:'center',
    backgroundColor: '#427E7B',
    paddingLeft:10,
  

  },
  navBarTitle:{
    color:'#FFFFFF',
    backgroundColor:'transparent',
    fontSize:16,
    paddingRight:10,
    paddingTop:5,
    fontFamily:'FuturaStd-Book',

  },
  navBackArrow:{
    tintColor:'#FFFFFF',

  },
  backImage:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }

});

AppRegistry.registerComponent('LoanApp', () => LoanApp);
