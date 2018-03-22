import React, { Component } from 'react';
import { WebView, Text, View, StyleSheet,AsyncStorage ,Alert} from 'react-native';

import { connect } from 'react-redux';
//const PLAID_API_KEY = '7926ca91824869fc9784cb228445b4' //abhijit
//const PLAID_API_KEY = '60b04c56bd7e0ab373c96ffad2f17d' //sohil
const PLAID_API_KEY = 'a7cdb8bf254410087e1ff357a4de93' //LIVE
//const PLAID_API_KEY = 'a7cdb8bf254410087e1ff357a4de93'
const PLAID_ENV = 'production'
//const PLAID_ENV = 'sandbox'
const PLAID_PRODUCT = 'auth'
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import CustomAlertDialog from './CustomAlertDialog';

import {
  showLoading,
  clearResponse,
  connectBank
} from '../actions/ConnectBankAccount';

const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) { 
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() { 
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };

  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';


 class PlaidView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      errorMsg: '',
      resData:'',
      code:'',
      msg:'',
      data: {},
      plaidToken:'',
      accountId:'',
      metaData:'',
      dialogMsg:'',
      isShowDialog:false,

    }

    this._onMessage = this._onMessage.bind(this)

  }

  componentWillReceiveProps(nextProps) {

      this.setState({resData:nextProps.responseData});
      this.setState({code:nextProps.responseData.code});
      this.setState({msg:nextProps.responseData.message});
      
      var resData=JSON.stringify(nextProps.responseData.data);
      try {
        if(resData != undefined)
        {
          let obj = JSON.parse(resData);
          AsyncStorage.setItem("userData",resData);
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

  checkAction(){
      Actions.pop();
  }

  componentDidUpdate(){


        if( this.state.data.action && this.state.data.action.indexOf('::exit') !== -1){
             console.log('PlaidView response>>>>>>>>>>>>in render exit'+this.state.data.action);
             Actions.pop();
        }
        else if(this.state.data.action && this.state.data.action.indexOf('::connected') !== -1){
             console.log('PlaidView response>>>>>>>>>>>>in render success'+this.state.data.action);
             //Actions.pop();

              console.log('data if======='+JSON.stringify(this.state.data));
              console.log('token if========'+this.state.data.metadata.public_token);
              console.log('accountId if====='+this.state.data.metadata.account_id);
              this.setState({plaidToken:this.state.data.metadata.public_token});
              this.setState({accountId:this.state.data.metadata.account_id});
              this.setState({metaData:this.state.data.metadata});
              this.setState({data:''});
              this.connectAccount();
        }

        if(this.state.resData!=''){
        {

          console.log('code======='+this.state.code);
          if(this.state.code==200){
         
             console.log('code=======ifff'+this.state.code);
            this.props.showLoading(false);
            this.props.clearResponse();
            this.onConnectClick();
          }
          else if(this.state.code==201){
                this.props.showLoading(false);
                //Alert.alert(this.state.msg); 
                this.setState({isShowDialog:true});
                this.setState({dialogMsg:this.state.msg});    
                this.props.clearResponse();
               

               }
          else{
            this.props.showLoading(false);
            this.props.clearResponse();
            //Alert.alert(this.state.msg);
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.msg});

          }
        }
      }
      
  }



  onDialogButtonClick(){

      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
      Actions.pop();
      setTimeout(()=> Actions.refresh(), 100); 
  }

  onConnectClick=()=>{
      Actions.Congrats();
    }

  connectAccount(){


    
       this.props.showLoading(true);
       let access_token;
       AsyncStorage.getItem("token").then((value) => {
         if(value) {

            access_token=value;
            console.log('token if='+access_token);

         }
         else {

            console.log('token else='+value);
         }
       }).done();
       AsyncStorage.getItem("userId").then((value) => {
         if(value) {


            console.log('metadata if='+this.state.metaData);
            console.log('userId if='+access_token);
            console.log('data if='+this.state.data);
            console.log('token if='+this.state.plaidToken);
            console.log('accountId if='+this.state.accountId);

            var user={
             authToken:access_token,
             userId:value,
             token:this.state.plaidToken,
             accountId:this.state.accountId,
             metadata:JSON.stringify(this.state.metaData)
             
           };
           console.log('connect USER='+JSON.stringify(user));
           this.props.connectBank(user);

         }
         else {

            console.log('userId else='+value);
         }
       }).done();


     }


  render() {

      console.log('PlaidView response>>>>>>>>>>>>in render'+this.state.data.action);

      return (

            this.props.isLoading==true?this.renderDetails():this.state.isShowDialog?this.showDialog():this.renderLogin()
      );



  }
  renderLogin() {
    return <WebView 
      
      source={{uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${PLAID_API_KEY}&apiVersion=v2&env=${PLAID_ENV}&product=${PLAID_PRODUCT}&clientName=Gauthier Derrien&isWebView=true&isMobile=true&selectAccount=true&webhook=http://google.com`}} 
      javaScriptEnabled={true}
      injectedJavaScript={patchPostMessageJsCode} 
      startInLoadingState={true}
      onMessage={this._onMessage}
    />
  }

  renderDetails() {

      console.log('PlaidView response>>>>>>>>>>>>renderDetails'+this.state.data.action);
      return <View style={styles.container}>
                            {this.props.isLoading ?
                                <View style={styles.circles}>

                                   <Progress.CircleSnail
                                     size={55}
                                     style={styles.progress}
                                     thickness={5}
                                     color={[
                                       '#427E7C',
                                       '#427E7C',
                                       '#427E7C',
                                     ]}
                                   />
                               </View> : null
                             }

 
      </View>
  }

    showDialog() {

      console.log('PlaidView response>>>>>>>>>>>>renderDetails'+this.state.data.action);
      return <View style={styles.container}>
                           
                            {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                              <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
                            </View>:null}   
      </View>
  }

  _onMessage(e) {
    /*
      Response example for success

      {
        "action": "plaid_link-undefined::connected",
        "metadata": {
          "account": {
            "id": null,
            "name": null
          },
          "account_id": null,
          "public_token": "public-sandbox-e697e666-9ac2-4538-b152-7e56a4e59365",
          "institution": {
            "name": "Chase",
            "institution_id": "ins_3"
          }
        }
      }
    */


    console.log('PlaidView response>>>>>>>>>>>>renderDetails'+JSON.stringify(e.nativeEvent.data));
    this.setState({
      data: JSON.parse(e.nativeEvent.data)
    })


    
  }
}

const mapStateToProps = ({ connectBank }) => {

  const {isLoading,responseData} = connectBank;
  console.log("update Output plaid: "+JSON.stringify(responseData));
  return {

    isLoading:isLoading,
    responseData:responseData
  }
}


export default connect(mapStateToProps,{showLoading,clearResponse,connectBank})(PlaidView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
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

    dialogViewStyle:{

    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },   
});