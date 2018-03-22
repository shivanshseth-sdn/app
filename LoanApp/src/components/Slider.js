import { View, Image,AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import SignIn from './SignIn';
import SignInCommon from './SignInCommon';
import SliderTopCommon from './SliderTopCommon';
import StaticSliderReferral from './StaticSliderReferral';
import referImage from '../res/refer.png';
import account from '../res/account.png';
import requestloan from '../res/requesting-loan.png';
import security from '../res/security.png';
import repayment from '../res/repayment.png';
import backgroudImage from '../res/bg.png';
import general from '../res/referral_general.png';
import creditcheck from '../res/creditcheck.png';



import {Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

class Slider extends Component {

  renderDotIndicator() {
          return <PagerDotIndicator pageCount={8} />;
      }

      renderCommon() {
        return (

            <SignInCommon />

        );
      }


    componentDidMount() {
      
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            console.log("fcm_token==== "+token)
            if(token!=undefined){
              AsyncStorage.setItem("fcm_token", token);
            }
            else{
              AsyncStorage.setItem("fcm_token", 'fsdfdsfdfds');
            }
            //alert(token+"");
            // store fcm token in your server
        });
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(notif.local_notification){
              //this is a local notification
            }
            if(notif.opened_from_tray){
              //app is open/resumed because user clicked banner
            }
           // await someAsyncCall();
            
            if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                  break;
              }
            }
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log("fcm token===  "+token)
            if(token!=undefined){
              AsyncStorage.setItem("fcm_token", token);
            }
            else{
              AsyncStorage.setItem("fcm_token", 'fsdfdsfdfds');
            }
            //alert(token+"");
            // fcm token may not be available on first load, catch it here
        });
    }

    

  render() {
    return (

        <View style={{ flex: 1, width: null, height: null, justifyContent: 'center' }}>

        <IndicatorViewPager
        style={styles.indicatorContainer}
        indicator={this.renderDotIndicator()} >
        <View >
        <Image
         source={backgroudImage}
         style={styles.container}>
                      <View style={{ flex: 1, justifyContent: 'center' }} >
                      <SignIn />
                      </View>
                      </Image>
                      </View>

                      <View >
                      <Image
                       source={backgroudImage}
                       style={styles.container}>
                                    <View style={{ flex: 1, justifyContent: 'center' }} >
                                    <StaticSliderReferral />
                                    </View>
                                    </Image>
                      </View>
        
                      <View>
                      <Image
                       source={backgroudImage}
                       style={styles.container}>
                    <SliderTopCommon
                      source={referImage}
                      title="Refer friends to earn cash!"
                      subtitle="With Bankroll, you can earn up to $20 cash for referring friends who sign up and request a Bankroll (and pay us back). The referral bonus is deposited directly to your linked bank account."
                    />
                  </Image>
                    </View>
                    <View>
                    <Image
                     source={backgroudImage}
                     style={styles.container}>
                    <SliderTopCommon
                    source={account}
                    title="Adding a bank account. Easy as 1,2.."
                    subtitle="To receive your cash, we’ve made connecting a bank account as easy as possible. Simply enter your username and password and we do the rest."
                    />
                    </Image>
                    </View>
                    <View>
                    <Image
                     source={backgroudImage}
                     style={styles.container}>
                    <SliderTopCommon
                    source={requestloan}
                    title="Requesting a loan. Just a few clicks."
                    subtitle="Requesting cash is super easy. Simply connect to your bank account, provide some personal details, and your funds can be transferred instantly."
                    />
                        </Image>
                    </View>

                    <View>
                    <Image
                     source={backgroudImage}
                     style={styles.container}>
                    <SliderTopCommon
                    source={repayment}
                    title="Automated Repayment"
                    subtitle="Bankroll aims to make repayment stress free. How so? Your repayment schedule is automatic and set by you. If you ever want to change it, simply email or call us and we can adjust as needed."
                    />
                    </Image>
                    </View>
                    <View>
                    <Image
                     source={backgroudImage}
                     style={styles.container}>
                    <SliderTopCommon
                    source={security}
                    title="Security"
                    subtitle="Security is our highest priority. Bankroll uses 256-bit encryption, just like all of the biggest banks in the world."
                    />
                    </Image>
                    </View>

                     <View>
                    <Image
                     source={backgroudImage}
                     style={styles.container}>
                    <SliderTopCommon
                    source={creditcheck}
                    title="No Credit Check"
                    subtitle="Unlike traditional lenders, we don't check your FICO score and won't ding your credit score when you create an account."
                    />
                    </Image>
                    </View>


                    

                </IndicatorViewPager>
                <View style={{ position: 'absolute', bottom: 50, flex: 1.5, alignSelf: 'center' }}>
                  {this.renderCommon()}
                  </View>
                </View>

    );
  }
}

const styles = {
  indicatorContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    backgroundColor: '#559B93'
  },
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }
};


export default Slider;
