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
  WebView
} from 'react-native';
import CustomAlertDialog from './CustomAlertDialog';
import{ Actions} from 'react-native-router-flux';
const window = Dimensions.get('window');
const backImg  = require('../res/back.png');

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


class DwollaComponent extends Component{


      constructor(props) {
        super(props);
        
        this.state = {
          dialogMsg:'',
          isShowDialog:false,
          data: {},
          userId:''

        }

        this._onMessage = this._onMessage.bind(this)
      }
      
      componentWillMount(){
          this.getUserInfo();
          
      }
      
      componentDidMount() {
        
      
      }

      componentDidUpdate(){

        
        if(this.state.data!=''&&this.state.data!=undefined&&JSON.stringify(this.state.data)!='{}'){
          if(this.state.data.code==200){
             
             
             
             Actions.Congrats();
             this.setState({data:''});
             
          }
          else{

            
            
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.data.message});    
            this.setState({data:''});
          }
        } 
      }

      onDialogButtonClick(){

          this.setState({isShowDialog:false});
          this.setState({dialogMsg:''});
          Actions.Dashboard({type: "reset"});
          setTimeout(()=> Actions.refresh(), 100); 
     }

      getUserInfo(){

        AsyncStorage.getItem("userData").then((value) => {
            if(value) {

                
                let obj = JSON.parse(value);

                
                
                this.setState({userId:obj._id});                               
            }
            else {

                console.log('dwolla userData else='+value);
            }
          }).done();

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

                    source={{uri: 'http://52.39.212.226:5051/#/linkfundingsources/'+this.state.userId}}
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


            </View>
      );
    }

    _onMessage(e) {

        var res=JSON.parse(e.nativeEvent.data);
      
          this.setState({
            data: JSON.parse(e.nativeEvent.data)
         })

         if(res!=''&&res!=null&&res!=undefined){
               
                if(res.code==200){
                  AsyncStorage.setItem("userData",JSON.stringify(res.data));
                }
          }
         
         
         
     }
}
export default DwollaComponent;
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


});
