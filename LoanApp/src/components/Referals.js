import React,{Component} from 'react';

import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  Dimensions,
  ScrollView,
  AsyncStorage,
  InteractionManager,
 
  Platform
} from 'react-native';
import Share, {ShareSheet} from 'react-native-share';
const window = Dimensions.get('window');
//import {ShareDialog} from 'react-native-fbsdk';


class Referals extends Component{
  
  

      constructor(props) {
        super(props);
        
        this.state = {
          visible: false,
          referralCode:'',
          result: ''
        }
      }
    

      componentWillMount(){
 
          console.log('step1 componentWillMount ==== ');
      }
      
      componentDidMount() {
        
        InteractionManager.runAfterInteractions(() => {
           this.getUserInfo();
        });
      }
      getUserInfo(){

         AsyncStorage.getItem("userData").then((value) => {
        if(value) {

            console.log('userData if='+value);
            let obj = JSON.parse(value);
            console.log('userData if code='+obj.referral_code);
            //access_token=obj.token;
            //userId=obj._id;
            this.setState({referralCode:obj.referral_code});

            
        }
        else {

            console.log('userData else='+value);
        }
      }).done();

      }

  /*_shareText() {
    console.log('in share text');
    var referMSG='';
    if(this.state.referralCode!=''&&this.state.referralCode!=undefined&&this.state.referralCode!=null){
        //referMSG= "Hello,\nHave you seen the Bankroll app? Borrow up to $500 direct to you bank account. It's so easy to use and affordable! Use this link to receive $20 off your first loan and earn $20 cash for referring friends!\nUse referral code: "+this.state.referralCode+"\nDwonload now:\nhttps://www.apple.com/in/itunes/\nRegards,\nThe Bankroll Team,\nsupport@bankroll.co";
          referMSG="Have you seen the Bankroll app? Borrow up to $500 direct to you bank account. It's so easy to use and affordable! Use this link to receive $20 off your first loan and earn $20 cash for referring friends! Use referral code: "+this.state.referralCode
    }
    Share.share({
      message: referMSG,
      url: 'https://www.apple.com/in/itunes/',
      title: 'Bankroll'
    }, {
      dialogTitle: 'Bankroll',
      tintColor: 'green'
    })
    .then(this._showResult.bind(this))
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {

    console.log('in share '+result);
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
  }*/


    render(){

    


      var referMSG='';
      if(this.state.referralCode!=''&&this.state.referralCode!=undefined&&this.state.referralCode!=null){
        //referMSG= "Hello,\nHave you seen the Bankroll app? Borrow up to $500 direct to you bank account. It's so easy to use and affordable! Use this link to receive $20 off your first loan and earn $20 cash for referring friends!\nUse referral code: "+this.state.referralCode+"\nDwonload now:\nhttps://www.apple.com/in/itunes/\nRegards,\nThe Bankroll Team,\nsupport@bankroll.co";
          referMSG="Have you seen the Bankroll app? Borrow up to $500 direct to you bank account. It's so easy to use and affordable! Use this link to receive $20 off your first loan and earn $20 cash for referring friends! Use referral code: "+this.state.referralCode
      }

      let shareOptions = {
       
        message: referMSG,
        url:(Platform.OS === 'ios') ? "https://www.apple.com/in/itunes/" : "https://play.google.com/store/apps",
       
      };

      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>
         
          <View style={styles.referCodeContainer}>
                  <View >
                    <Text style={styles.forgotText}>Share your referral code!</Text>
                  </View>
                  <View style={styles.circle}>
                    <Text style={styles.codeText}>{this.state.referralCode}</Text>
                  </View>

          </View>
          <View style={styles.socialContainer}>
               <View >
                 <Text style={styles.referralText}>Share your referral code with your friends and earn cash, deposited directly to your account, on every repaid loan. </Text>
               </View>

               <View style={styles.buttonViewStyle}>
                <TouchableOpacity
                  onPress={()=>{
                    Share.open(shareOptions).catch((err) => { err && console.log(err); })
                  }}
                 style={styles.buttonLogin}>
                    <Text style={styles.buttonTextStyle}>Refer a Friend</Text>
                </TouchableOpacity>
              </View>
             </View>

        </Image>
      );
    }
}
export default Referals;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent:'center',
    resizeMode: 'cover',
    paddingTop: 60
  },
  referCodeContainer:{
    flex:2,
    alignItems:'center',
    justifyContent:'center',
  },
  socialContainer:{
    flex:3,
    backgroundColor:'#ffffff',
  },
  circle: {
    marginTop:30,
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: '#427E7C'
  },
  socialIconContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:40,
    marginLeft:20,
    marginRight:20
  },
  forgotText: {
    color:'#ffffff',
    fontSize: 20,
    textAlign: 'center',
    
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book'
  },
  codeText: {
    color:'#ffffff',
    fontSize: 20,
    textAlign: 'center',
    alignItems:'center',
    paddingTop:40,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  referralText: {
    fontWeight: '400',
    color:'#427E7B',
    fontSize: 16,
    textAlign: 'center',
    paddingTop:30,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,
  },

  iconView:{
    alignItems:'center',
    paddingLeft:5,
    paddingRight:5
  },
  socialText:{
    fontWeight: '400',
    paddingTop:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
    buttonLogin:{
    height: 45,
    borderRadius: 5,
    paddingTop:(Platform.OS === 'ios') ? 5 : 0,
    justifyContent: 'center', 
        alignItems: 'center', 
    width:window.width*0.5,
    backgroundColor: '#7ACBBC'},

  buttonTextStyle:{
      color:'#ffffff',
      fontSize: 18,
        alignSelf: 'center',
      fontFamily:'FuturaStd-Book',
    },

buttonViewStyle:{
      marginTop:45,
      justifyContent:'center',
      alignItems:'center'
    }


});
