import React,{Component} from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import {
  Image,
  StyleSheet,
  Navigator,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
  WebView,
  Platform,
  PermissionsAndroid

} from 'react-native';

import {
    agreementReqCall,
    showLoading,
    clearResponse,
   
} from '../actions/AgreementAction';

import FusedLocation from 'react-native-fused-location';
import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import {CardWithWhiteBG} from './common';
import CheckBox from 'react-native-checkbox';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import CustomAlertDialog from './CustomAlertDialog';



class Agreement extends Component{

    constructor() {
        super();
        this.state = {
          checkboxBankroll: true,
          checkboxDwolla: true,
          checkboxDwollaPrivacy: true,
          checkboxAutoPay: true,
          resData:'',
          code:'',
          msg:'',
          errorMsg: '',
          dialogMsg:'',
          isShowDialog:false,
          isTerm:false,
          initialPosition: 'unknown',
          lastPosition: 'unknown',
          lat:25.4405158,
          long:-80.501887,
          
        };
    }
     watchID: ?number = null;

  
     iOSLoaction(){
        navigator.geolocation.getCurrentPosition(
             (position) => {
                const initialPosition = JSON.stringify(position);
                this.setState({ initialPosition });
                let address = JSON.parse(initialPosition);
                this.setState({lat: address.coords.latitude, long: address.coords.longitude}); 
             },
             (error) => alert(error.message),
             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        
          this.watchID = navigator.geolocation.watchPosition((position) => {
             const lastPosition = JSON.stringify(position);
             this.setState({ lastPosition });
          });
     }


      checkPermission = async () => {

               
                      
                          const granted = await PermissionsAndroid.request(
                          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                              title: 'App needs to access your location',
                              message: 'App needs access to your location ' +
                              'so we can let our app be even more awesome.'
                              }
                          );

                           if (granted) {
     
                                  FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
                                  
                                  // Get location once. 
                                  const location = await FusedLocation.getFusedLocation(); 
                                  this.setState({lat: location.latitude, long: location.longitude}); 
                                
                                  // Set options.
                                  FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED); 
                                  FusedLocation.setLocationInterval(20000);
                                  FusedLocation.setFastestLocationInterval(15000); 
                                  FusedLocation.setSmallestDisplacement(10);
                                  
                                  
                                  // Keep getting updated location.
                                  FusedLocation.startLocationUpdates();
                                  
                                  // Place listeners.
                                  this.subscription = FusedLocation.on('fusedLocation', location => {
                                
                                     console.log(location); 
                                  }); 
                               }
                                         
      }
     
    androidLocation(){

       this.checkPermission().done();

    }
    componentDidMount() {

      (Platform.OS === 'ios') ? this.iOSLoaction():this.androidLocation(); 
             

   }
    componentWillMount(){

    }
    componentWillUnmount () {

       (Platform.OS === 'ios') ?
        navigator.geolocation.clearWatch(this.watchID)
        :
          FusedLocation.off(this.subscription);
          
          FusedLocation.stopLocationUpdates();
   }



    onDialogButtonClick(){
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
    }
    onConnectClick=()=>{
        Actions.Dashboard({type: "reset"});
      }

      componentWillReceiveProps(nextProps) {

        this.setState({resData:nextProps.responseData});
        this.setState({code:nextProps.responseData.code});
        this.setState({msg:nextProps.responseData.message});

        var resAgreementData=JSON.stringify(nextProps.responseData.userData);
        try {
          if(resAgreementData != undefined)
          {

            let obj = JSON.parse(resAgreementData);
            AsyncStorage.setItem("userData",resAgreementData);
         
            if(obj._id!=undefined){
                AsyncStorage.setItem("userId", obj._id);
            }
            if(obj.token!=undefined){
              AsyncStorage.setItem("token", obj.token);
            }
          
          }


        } catch (ex) {
          console.error(ex);
        }
       

  }
      componentDidUpdate() {

        if(this.state.resData!=''){
          {
            if(this.state.code==200){
              this.props.clearResponse();
              this.onConnectClick();
            }
            else{
              this.props.clearResponse();
             // Alert.alert(this.state.msg);
             this.setState({isShowDialog:true});
             this.setState({dialogMsg:this.state.msg});
            }
          }
        }

      
      }

      createUserReq(){

          console.log("initialPosition= "+this.state.initialPosition);
          console.log("lastPosition= "+this.state.lastPosition);
          console.log("lat= "+this.state.lat+" "+"long= "+this.state.long);
        

          this.props.showLoading(true);
          let access_token,userId,loanTypeId,name,phone,loan_amt,processingFees;
          let rateOfIntrest,repaymentOption,repaymentDate1,repaymentDate2,repaymentamt1;
          let repaymentamt2,totalRepayment,bankrollAgreement,termsAndCondition,authorization,agreement_signed;

      
    
      AsyncStorage.getItem("userData").then((value) => {
        if(value) {

            console.log('userData if='+value);
            let obj = JSON.parse(value);
            access_token=obj.token;
            userId=obj._id;
            loanTypeId=obj.qualified_for_loan_type;
            name=obj.username;
            phone=obj.contact;

            
        }
        else {

            console.log('userData else='+value);
        }
      }).done();

      

      AsyncStorage.getItem("calculatedAmount").then((value) => {
        if(value) {
         

          let obj = JSON.parse(value);
          loan_amt=obj.loan_amt;
          processingFees=obj.fees;
          rateOfIntrest=obj.rateOfIntrest;
          repaymentOption=obj.repaymentOption;
          
          if(parseInt(repaymentOption, 10)==1){
            repaymentamt1=obj.repaymentamt1;
            repaymentamt2=0;
            repaymentDate1=obj.repaymentDate1;
          }
          else{
            repaymentamt1=obj.repaymentamt1;
            repaymentamt2=obj.repaymentamt2;
            repaymentDate1=obj.repaymentDate1;
            repaymentDate2=obj.repaymentDate2;
          }
       
          totalRepayment=obj.totalRepayment;
           
          var user={


              authToken:access_token,
              userId:userId,
              loanTypeId:loanTypeId,
              name:name,
              phone:phone,
              loan_amt:parseFloat(loan_amt),
              processingFees:parseFloat(processingFees),
              rateOfIntrest:parseFloat(rateOfIntrest),
              repaymentOption:parseInt(repaymentOption, 10),
              repaymentDate1:repaymentDate1,
              repaymentDate2:repaymentDate2,
              repaymentamt1:parseFloat(repaymentamt1),
              repaymentamt2:parseFloat(repaymentamt2),
              totalRepayment:parseFloat(totalRepayment),
              bankrollAgreement:true,
              termsAndCondition:true,
              authorization:true,
              agreement_signed:true,
              latitude:this.state.lat,
              longitude:this.state.long

           };
           console.log('Agreement USER='+JSON.stringify(user));
           this.props.agreementReqCall(user);
        }
        else {

            console.log('calculatedAmount else='+value);
        }
      }).done();

  }

  onAgreeButtonCall(){

      console.log('checkbox val='+this.state.checkboxBankroll);
      if(this.state.checkboxBankroll==true){

          //Alert.alert('In order to complete the Bankroll loan request, you must review and confirm all agreements above.');
          this.setState({errorMsg:'In order to complete the Bankroll loan request, you must review and confirm all agreements above.'});
      
      }
      else if(this.state.checkboxDwolla==true){
           this.setState({errorMsg:'In order to complete the Bankroll loan request, you must review and confirm all agreements above.'});
      }
      else if(this.state.checkboxDwollaPrivacy==true){
           this.setState({errorMsg:'In order to complete the Bankroll loan request, you must review and confirm all agreements above.'});
      }
      else if(this.state.checkboxAutoPay==true){
            this.setState({errorMsg:'In order to complete the Bankroll loan request, you must review and confirm all agreements above.'});
      }
      else{

              this.setState({errorMsg:''});
             this.createUserReq();
      }
     


    }

onReadClick=()=>{
      if(this.state.isTerm==false){
        this.setState({isTerm:true});
      }
      else{
        this.setState({isTerm:false});
      }
    }

  

    render(){

    

      var textAgreement="By checking the boxes above, you agree to the Bankroll's privacy policy, credit authorization, and electronic disclosures.";
      return(

         this.state.isTerm==true?<WebView
                source={{uri: 'https://www.dwolla.com/legal/tos/'}}
                domStorageEnabled={true}
                startInLoadingState={true}
                javaScriptEnabled={true}
                style={styles.webviewcontainer}
              />:
        <Image style={styles.container}
          source={require('../res/bg.png')}>
         
          <ScrollView>
            <View>
            <View style={styles.linkAccountImageContainer}>

            </View>

            <Text style={styles.forgotDetailText}>Please review and accept the following agreements by clicking each box to complete your Bankroll loan.</Text>

            <View style={styles.cardsContainer}>
              <CardWithWhiteBG>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    label='Bankroll Agreement'
                    labelStyle={styles.checkboxlablel}
                    onChange={(checked) => this.setState({checkboxBankroll:checked})}

                    />
                </View>

              </CardWithWhiteBG>

              <CardWithWhiteBG>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    label='Dwolla Terms and Conditions'
                    labelStyle={styles.checkboxlablel}
                    onChange={(checked) => this.setState( {checkboxDwolla:checked})}
                    />
                </View>

              </CardWithWhiteBG>

               <CardWithWhiteBG>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    label='Dwolla Privacy Policy'
                    labelStyle={styles.checkboxlablel}
                    onChange={(checked) => this.setState( {checkboxDwollaPrivacy:checked})}
                    />
                </View>

              </CardWithWhiteBG>

              <CardWithWhiteBG>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    label='Auto Pay Authorization'
                    
                    labelStyle={styles.checkboxlablel}
                    onChange={(checked) => this.setState({checkboxAutoPay:checked})}
                    />
                </View>

              </CardWithWhiteBG>


            </View>

            <Text style={styles.forgotDetailText}>{textAgreement}</Text>

            <TouchableOpacity
                 onPress={this.onReadClick}
                 >
               <Text style={styles.viewText}>Dwolla Terms of Service and Privacy Policy</Text>

            </TouchableOpacity>

             {
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
            }

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.onAgreeButtonCall.bind(this)}
                  >
                  <Text style={styles.buttonTextStyle}>I Agree</Text>
              </TouchableOpacity>
            </View>

              {this.props.isLoading ?
              <View style={styles.circles}>

                 <Progress.CircleSnail
                   style={styles.progress}
                   thickness={5}
                   size={55}
                   color={[
                     '#427E7C',
                     '#427E7C',
                     '#427E7C',
                   ]}
                 />
             </View> : null
           }

          </View>


        </ScrollView>
        <View style={styles.bottomView}>
            <Text style={styles.bottomText}>Documents will be emailed to you upon completion.</Text>
        </View>

          {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                        <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
                  </View>:null}   
      </Image>
      );
    }
}

const mapStateToProps = ({ agreementReducer }) => {

  const {isLoading,responseData} = agreementReducer;
  console.log("agreement Output: "+JSON.stringify(responseData));
  return {
 
    isLoading:isLoading,
    responseData:responseData
  }
}

export default connect(mapStateToProps,{showLoading,clearResponse,agreementReqCall})(Agreement);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent:'center',
    resizeMode: 'cover',
    paddingTop: 80
  },
  webviewcontainer: {
    flex: 1,
    width: null,
    height: null,
    marginTop: 60
  },
  forgotText: {
    color:'#ffffff',
    fontSize: 20,
    textAlign: 'center',
    paddingTop:20,
    fontFamily:'FuturaStd-Book',
       backgroundColor:'transparent'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'center',
    paddingTop:15,
    paddingLeft:25,
    paddingRight:25,
    fontFamily:'FuturaStd-Book',
       backgroundColor:'transparent',
         lineHeight:(Platform.OS === 'ios') ? 0 : 25,

  },

  bottomText: {
    color:'#ffffff',
    fontSize: 14,
    textAlign: 'center',
   
    paddingTop:(Platform.OS === 'ios') ? 20 : 15,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },

  viewText: {
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold',
    paddingTop:10,
      textDecorationLine: "underline",
    fontFamily:'FuturaStd-Book',
       backgroundColor:'transparent'

  },

  buttonViewStyle:{
    paddingTop:25,
    marginLeft: 20,
    marginRight:20,
    paddingBottom:10,
    alignSelf: 'stretch',
  },

  buttonLogin:{
    height: 45,
    borderRadius: 5,
     paddingTop:(Platform.OS === 'ios') ? 5 : 0,
       justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#7ACBBC'},

  buttonTextStyle:{
        color:'#ffffff',
        fontSize: 18,
        alignSelf: 'center',
        fontFamily:'FuturaStd-Book',
  },
  linkAccountImageContainer:{

    alignItems:'center'
  },
  cardsContainer:{
    marginLeft:20,
    marginRight:20,
    paddingTop:15,
    paddingBottom:10

  },
  checkboxContainer:{
    paddingTop:10,
    paddingBottom:5,
    paddingLeft:10
  },
  checkboxlablel:{color:'#39383E',fontSize:16,fontFamily:'FuturaStd-Book',paddingTop:(Platform.OS === 'ios') ? 5 : 0,},
  bottomView:{
    height:50,
    backgroundColor:'#3A393F'
  },

  
  circles: {
            position:'absolute',
            left:0,
            right:0,
            top:0,
            bottom:0,
            justifyContent:'center',
            alignItems:'center'
          },
  progress: {
            margin: 10,

          },

          errorText: {
    color:'red',
    fontSize: 14,
    textAlign: 'center',
    paddingTop:15,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book'
  },
    dialogViewStyle:{

    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },


});
