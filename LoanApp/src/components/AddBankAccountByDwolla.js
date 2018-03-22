import React,{Component} from 'react';
import { connect } from 'react-redux';
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
  WebView
} from 'react-native';
import CustomAlertDialog from './CustomAlertDialog';
import * as Progress from 'react-native-progress';

import{ Actions} from 'react-native-router-flux';
const window = Dimensions.get('window');
const backImg  = require('../res/back.png');

import {

  showLoadingLinkAccount,
  clearResponseLinkAccount,
  linkBankReq
} from '../actions/AddBankAccountByDwollaAction';


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


class AddBankAccountByDwolla extends Component{


      constructor(props) {
        super(props);
        
        this.state = {
          dialogMsg:'',
          isShowDialog:false,
          data: {},
          userId:'',
          auth_token:'',
          resData:'',
          code:'',
          msg:'',

        }

        this._onMessage = this._onMessage.bind(this)
      }
      
      componentWillMount(){
          this.getUserInfo();
          console.log('step1 componentWillMount ==== ');
      }
      
      componentDidMount() {
        
    
      }

      componentWillReceiveProps(nextProps) {

      this.setState({resData:nextProps.linkedAccountDwollaRes});
      this.setState({code:nextProps.linkedAccountDwollaRes.code});
      this.setState({msg:nextProps.linkedAccountDwollaRes.message});
      
    
  }


      componentDidUpdate(){

        console.log('dwolla response>>>>>>>>>>>>componentDidUpdate'+this.state.data.data);
        if(this.state.data!=''&&this.state.data!=undefined&&JSON.stringify(this.state.data)!='{}'){
          if(this.state.data.code==200){
             console.log('dwolla response>>>>>>>>>>>>in render exit???'+this.state.data.data._links["funding-source"].href);
             
             
             //
             this.linkAccount(this.state.data.data._links["funding-source"].href);
             this.setState({data:''});
             
          }
          else{

            console.log('dwolla response>>>>>>>>>>>>in render exit'+this.state.data);
            
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.data.message});    
            this.setState({data:''});
          }
        } 


        if(this.state.resData!=''){
        {

          console.log('code======='+this.state.code);
          if(this.state.code==200){
         
            console.log('code=======ifff'+this.state.code);
            this.props.showLoadingLinkAccount(false);
            this.props.clearResponseLinkAccount();
            
            Actions.Dashboard({type: "reset"});
            setTimeout(()=> Actions.refresh(), 100); 
          }
          else{
            this.props.showLoadingLinkAccount(false);
            this.props.clearResponseLinkAccount();
           
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

      getUserInfo(){

        AsyncStorage.getItem("userData").then((value) => {
            if(value) {

                console.log('dwolla userData if='+value);
                let obj = JSON.parse(value);

                console.log('dwolla userData if code='+obj._id);
                
                this.setState({userId:obj._id});  
                this.setState({auth_token:obj.token});                             
            }
            else {

                console.log('dwolla userData else='+value);
            }
          }).done();

      }

      linkAccount(fundingSourceId){
        this.props.showLoadingLinkAccount(true);
        var user={
             authToken:this.state.auth_token,
             userId:this.state.userId,
             fundingSource:fundingSourceId,
             
             
           };
           console.log('connect USER='+JSON.stringify(user));
           this.props.linkBankReq(user);

      }


    render(){

     
      return(
            
            <View style={{flex:1}}>

              <Image style={styles.logoContainer}
                            source={require('../res/header.png')}>

                     <Image 
                    source={require('../res/vertical_logo.png')}>
                    </Image>
                    <TouchableOpacity underlayColor="transparent" style={styles.hamBurgerContainer} onPress={() => this.onBackPress()}>
                            <Image
                                  source={backImg}
                                  resizeMode="contain">
                              </Image>
                          </TouchableOpacity>

          </Image>

          <WebView

                    source={{uri: 'http://52.39.212.226:5051/#/addaccounts/'+this.state.userId}}
                    javaScriptEnabledAndroid={true}
                    javaScriptEnabled={true}
                    startInLoadingState={true}
                    bounces={false}
                    builtInZoomControls={false}
                    injectedJavaScript={patchPostMessageJsCode} 
                    style={styles.webviewcontainer}
                    onMessage={this._onMessage}
                  />

               {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                              <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
                            </View>:null}   

                 {this.props.isLoadingLinkAccountDwolla ?
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
      );
    }

    _onMessage(e) {

        var res=JSON.parse(e.nativeEvent.data);
        console.log('dwolla response>>>>>>>>>>>>on message'+e.nativeEvent.data);
        console.log('dwolla response>>>>>>>>>>>>on message'+res.data);
          this.setState({
            data: JSON.parse(e.nativeEvent.data)
         })

     
         
         
     }
}


const mapStateToProps = ({ addBankAccountByDwollaReducer }) => {

  const {isLoadingLinkAccountDwolla,linkedAccountDwollaRes} = addBankAccountByDwollaReducer;
  console.log("linkedAccountDwollaRes Output : "+JSON.stringify(linkedAccountDwollaRes));
  return {

    isLoadingLinkAccountDwolla:isLoadingLinkAccountDwolla,
    linkedAccountDwollaRes:linkedAccountDwollaRes
  }
}


export default connect(mapStateToProps,{showLoadingLinkAccount,clearResponseLinkAccount,linkBankReq})(AddBankAccountByDwolla);
const styles = StyleSheet.create({
 
    logoContainer:{
      height:64,
      width: null,
      paddingTop:10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover',
    },

    hamBurgerContainer:{

      position: 'absolute',
      left: 5,
      paddingTop:20,
      paddingRight:20,
      padding:10
  },
  dialogViewStyle:{

    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
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


});
