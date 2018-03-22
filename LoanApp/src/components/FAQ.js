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
  ScrollView,
   Platform
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import{ Actions} from 'react-native-router-flux';
import {CardWithWhiteBG} from './common';
import * as Progress from 'react-native-progress';
import CustomAlertDialog from './CustomAlertDialog';
import {
  
    showLoadingFAQ,
    clearResponseFAQ,
    FAQReq

} from '../actions/FAQActions';


const SECTIONS = [];

class FAQ extends Component{


    constructor() {
      super();
      this.state = {
        errorMsg: '',
        responseData:'',
        code:'',
        msg:'',
        popuMsg:'',
        dialogMsg:'',
        isShowDialog:false,

      };

  }

    onDialogButtonClick(){
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
    }


  componentWillReceiveProps(nextProps) {

    this.setState({responseData:nextProps.responseData});
    this.setState({code:nextProps.responseData.code});
    this.setState({msg:nextProps.responseData.message});

  

              var resData=JSON.stringify(nextProps.responseData.data);
             
              

              try {
                if(resData != undefined&&resData!=''&&resData!="{}")
                {
                  let obj = JSON.parse(resData);
                  SECTIONS=obj.slice();
                  
                        
                }
                

              } catch (ex) {
                console.error(ex);
              }
     

  }

  componentWillMount(){
    this.props.showLoadingFAQ(true);
     this.props.FAQReq();
       
  }

  componentWillUnmount(){
    
     
    

  }

  componentDidUpdate() {

          if(this.state.responseData!=''){
        
              if(this.state.code==200){

                this.props.showLoadingFAQ(false);
                this.props.clearResponseFAQ();

              }
              else{

                 this.props.showLoadingFAQ(false);
                 this.props.clearResponseFAQ();
                
                
                 this.setState({isShowDialog:true});
                 this.setState({dialogMsg:this.state.msg});

              }
        
          }
  }


  _renderHeader(section, index, isActive) {
    return (

         <View>
          <CardWithWhiteBG>
              <View style={styles.header}>
                <Text style={styles.headerTextStyle}>{section.faq_que}</Text>
                {isActive?
                  <Image style={styles.expandImageStyle}
                          source={require('../res/faq_sub.png')}>
                 </Image>:<Image style={styles.expandImageStyle}
                          source={require('../res/faq_add.png')}>
                 </Image>    
                }
                        
              </View>
          </CardWithWhiteBG>
        </View>
       
    );
  }
 
  _renderContent(section, i, isActive) {
    return (
      <View style={styles.content}>
        <Text style={styles.contetnTextStyle}>{section.faq_ans}</Text>
      </View>
    );
  }

    render(){
      return(



                  <View style={styles.container}>

               

                    <ScrollView contentContainerStyle={{backgroundColor:'#fff',paddingBottom:50}}>

                    <View style={styles.accordianViewStyle}>
                     <Accordion
                        sections={SECTIONS}
                        underlayColor='transparent'
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                      />
                     </View> 
                    </ScrollView>

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

                      {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                            <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
                      </View>:null} 

                  </View>
 
      );
    }
}


const mapStateToProps = ({ faq_reducer }) => {

  const {isLoading,responseData} = faq_reducer;
  

  return {
    isLoading: isLoading,
    responseData: responseData,
    
  }
}
    
     

export default connect(mapStateToProps,{showLoadingFAQ,clearResponseFAQ,FAQReq})(FAQ);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor:'#fff',
    paddingTop: 60
  },

  accountMsgText:{
    textAlign:'center',
    color:'#ffffff',
    fontSize:16,
    paddingTop:40,
    paddingRight:25,
    paddingLeft:25,
    paddingBottom:40,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  accordianViewStyle:{
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10
  },
  headerTextStyle:{
    flex:2,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent',
    fontSize:16,
    color:'#427E7B',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:10
  },

  contetnTextStyle:{
    
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent',
    fontSize:15,
    color:'#000',
    paddingBottom:5,
    paddingLeft:20,
    paddingRight:10,
    paddingTop:10,
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,

  },
  header:{
    flexDirection:'row',
    justifyContent: 'space-between',
     alignItems:'center'
  },
  expandImageStyle:{
       padding:5,
       marginRight:10
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
