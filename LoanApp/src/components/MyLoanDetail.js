import React,{Component} from 'react';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,ScrollView,
  AsyncStorage,
  Platform
} from 'react-native';
import Moment from 'moment';
import { connect } from 'react-redux';

import {
    showLoadingEarlyPayment,
    clearResponseEarlyPayment,
    earlyPaymentReq,
   
} from '../actions/EarlyPaymentAction';

import {
    
    showLoading,
    clearResponse,
    getLoanDetail
    
} from '../actions/RequestLoanDetailAction';

import CustomAlertDialog from './CustomAlertDialog';
import * as Progress from 'react-native-progress';
import DeleteAlert from './DeleteAlert';

class MyLoanDetail extends Component{

  constructor() {
      super();
      this.state = {
        errorMsg: '',
        loanId:'',
        data:[],
        selectedLoanDetail:'',
        loanStatus:'',
        resData:'',
        code:'',
        msg:'',
        dialogMsg:'',
        isShowDialog:false,
        isShowEarlyPaymentDialog:false,

      };
  }


  componentWillMount(){

      AsyncStorage.getItem("userData").then((value) => {
          if(value) {

              console.log('qualificationRes if='+value);
              

              let obj = JSON.parse(value);
              if(obj.loanId){
                 this.setState({loanId:obj.loanId});
                 this.getDetailReq(obj.loanId);
              }
             
            
              


          }
          else {

              console.log('qualificationRes else='+value);
          }
        }).done();

      /*AsyncStorage.getItem("selectedLoanId").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
                            this.setState({loanId:value});
                            this.getDetailReq(value);
                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();*/

      /*AsyncStorage.getItem("loanDetail").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
                            let obj = JSON.parse(value);
                            this.setState({data:obj});
                            if(this.state.length!=0){
                                for(var i=0; i<this.state.data.length;i++){
                                   console.log('loand id ======================='+this.state.data[i].loanUniqueId);
                                   if(this.state.loanId==this.state.data[i].loanUniqueId){
                                        this.setState({selectedLoanDetail:this.state.data[i]});

                                        console.log('loand detail ======================='+JSON.stringify(this.state.data[i]));
                                   }

                                }
                                this.setState({loanStatus:this.state.selectedLoanDetail.loan_paid_status});
                            }


                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();*/
     
        console.log('SignUp componentWillMount ==== ');
    }


      componentWillReceiveProps(nextProps) {

        this.setState({resData:nextProps.earlyPaymentRes});
        this.setState({code:nextProps.earlyPaymentRes.code});
        this.setState({msg:nextProps.earlyPaymentRes.message});

        var earlyPaymentRes=JSON.stringify(nextProps.earlyPaymentRes.userData);
        try {
          if(earlyPaymentRes != undefined)
          {

            let obj = JSON.parse(earlyPaymentRes);
            AsyncStorage.setItem("userData",earlyPaymentRes);
            console.log(' signupRes componentWillReceiveProps ====>>>> '+obj.token);
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

      this.setState({resLoanData:nextProps.responseData});
      this.setState({codeLoan:nextProps.responseData.code});
      this.setState({msgLoan:nextProps.responseData.message});

      var resLoanData=JSON.stringify(nextProps.responseData.data);
      try {
      if(resLoanData != undefined)
      {
        let obj = JSON.parse(resLoanData);
        if(resLoanData!=undefined){
          
          this.setState({selectedLoanDetail:obj});
          if(obj.loan_paid_status!=undefined&&obj.loan_paid_status!=''&&obj.loan_paid_status!=null){
              this.setState({loanStatus:obj.loan_paid_status.toUpperCase()});
          }
        
          
        //this.setState({loan_amt:obj.loan_amt,fee:obj.processingFees,emi1Amount:obj.repaymentamt1,emi2Amount:obj.repaymentamt2,totalAmount:obj.totalRepayment,paymentDate1:obj.repaymentDate1,paymentDate2:obj.repaymentDate2,paymentOption:obj.repaymentOption,loanStaus:obj.loan_paid_status,loanId:obj.loanTypeId})

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
              this.props.clearResponseEarlyPayment();
              this.props.showLoadingEarlyPayment(false);
              this.setState({isShowDialog:true});
              this.setState({dialogMsg:this.state.msg});
            }
            else{
              this.props.clearResponseEarlyPayment();
              this.props.showLoadingEarlyPayment(false);
              this.setState({isShowDialog:true});
              this.setState({dialogMsg:this.state.msg});
            }
          }
        }

        if(this.state.resLoanData!=''){
        {
          if(this.state.codeLoan==200){

            this.props.showLoading(false);
            this.props.clearResponse();
            
          }
          else{
             this.props.showLoading(false);
            this.props.clearResponse();
           
          }
        }
      }
    }


      getDetailReq(id){

   
                  this.props.showLoading(true);
                    AsyncStorage.getItem("userData").then((value) => {
                    
                    if(value) {

                        console.log('userData if='+value);
                        let obj = JSON.parse(value);
                        var user={
                          authToken:obj.token,
                          userId:obj._id,
                          id:id
                       
                        };
                        console.log('Update USER='+JSON.stringify(user));
                        this.props.getLoanDetail(user);
                        
                    }
                    else {

                        console.log('userData else='+value);
                    }
                  }).done();
     
      }

  onDialogButtonClick(){
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
    }

  onDialogYesButtonClick(){
    
         this.setState({isShowEarlyPaymentDialog:false});
         this.props.showLoadingEarlyPayment(true);
         AsyncStorage.getItem("userData").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
                            let obj = JSON.parse(value);
                    
                          
                           var user={

           
                            authToken:obj.token,
                            userId:obj._id

                          };
                          console.log('Update USER='+JSON.stringify(user));
                          this.props.earlyPaymentReq(user);


                            
                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();
        
      
  }
  onDialogNoButtonClick(){
      this.setState({isShowEarlyPaymentDialog:false});
      
  }

  onEarlyPaymentClick(){

      this.setState({isShowEarlyPaymentDialog:true});

  }
   loanStatusText(){
      console.log('loan detail status= ',JSON.stringify(this.state.selectedLoanDetail));
      if(this.state.selectedLoanDetail.loan_paid_status=='pending'){
        return(
            <View>
                 <Text style={styles.bankrollDetail}>Approved</Text>
            </View>
        );
      }
      else if(this.state.selectedLoanDetail.loan_paid_status=='inprogress'){
         return(
            <View>
                 <Text style={styles.bankrollDetail}>Deposited</Text>
            </View>
        );
      }
      else if(this.state.selectedLoanDetail.loan_paid_status=='completed'){
         return(
            <View>
                 <Text style={styles.bankrollDetail}>Completed</Text>
            </View>
        );
      }
      else if(this.state.selectedLoanDetail.loan_paid_status=='cancelled'){
         return(
            <View>
                 <Text style={styles.bankrollDetail}>Cancelled</Text>
            </View>
        );
      }
    }

    setNextPaymetData(){


        if(this.state.selectedLoanDetail.paymentdetail1 && this.state.selectedLoanDetail.paymentdetail2){
          console.log('inside first if setNextPaymetData');
           if(this.state.selectedLoanDetail.paymentdetail1.status.toLowerCase()=='pending'){
             console.log('inside second if setNextPaymetData');
             return(
              <View>
                <Text style={styles.amountText}>${this.state.selectedLoanDetail.paymentdetail1.repaymentamt1?parseFloat(this.state.selectedLoanDetail.paymentdetail1.repaymentamt1).toFixed(2):'0.00'}</Text>
                <Text style={styles.dateText}>Scheduled on {Moment(this.state.selectedLoanDetail.paymentdetail1.repaymentDate1).format('MMM DD YYYY')}</Text>
              </View>
              ); 
                   
          }
          else if(this.state.selectedLoanDetail.paymentdetail2.status.toLowerCase()=='pending'){
              return(
              <View>
              <Text style={styles.amountText}>${this.state.selectedLoanDetail.paymentdetail2.repaymentamt2?parseFloat(this.state.selectedLoanDetail.paymentdetail2.repaymentamt2).toFixed(2):'0.00'}</Text>
               <Text style={styles.dateText}>Scheduled on {Moment(this.state.selectedLoanDetail.paymentdetail2.repaymentDate2).format('MMM DD YYYY')}</Text>
              </View>
              ); 
          }
          else{
            return( <Text style={styles.amountText}>$0.00</Text>);
          }
        }
        else if(this.state.selectedLoanDetail.paymentdetail1){

           if(this.state.selectedLoanDetail.paymentdetail1.status.toLowerCase()=='pending'){
             console.log('inside second if setNextPaymetData');
             return(
              <View>
              <Text style={styles.amountText}>${this.state.selectedLoanDetail.paymentdetail1.repaymentamt1?parseFloat(this.state.selectedLoanDetail.paymentdetail1.repaymentamt1).toFixed(2):'0.00'}</Text>
               <Text style={styles.dateText}>Scheduled on {Moment(this.state.selectedLoanDetail.paymentdetail1.repaymentDate1).format('MMM DD YYYY')}</Text>
              </View>
              ); 
                   
            }
            else{
            return( <Text style={styles.amountText}>$0.00</Text>);
            }

        }
        else if(this.state.selectedLoanDetail.paymentdetail2){
          if(this.state.selectedLoanDetail.paymentdetail2.status.toLowerCase()=='pending'){
              return(
              <View>
              <Text style={styles.amountText}>${this.state.selectedLoanDetail.paymentdetail2.repaymentamt2?parseFloat(this.state.selectedLoanDetail.paymentdetail2.repaymentamt2).toFixed(2):'0.00'}</Text>
               <Text style={styles.dateText}>Scheduled on {Moment(this.state.selectedLoanDetail.paymentdetail2.repaymentDate2).format('MMM DD YYYY')}</Text>
              </View>
              ); 
          }
          else{
            return( <Text style={styles.amountText}>$0.00</Text>);
          }
        }

       

    }
   

    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>
         
        <View>
        <ScrollView contentContainerStyle={{paddingBottom:50}}>
          <View>
              <Text style={styles.nextPaymentText}>Next Repayment</Text>

              {
               
                  this.setNextPaymetData()
              
              }
             
             
              <View style={styles.buttonViewStyle}>

                    <TouchableOpacity style={styles.buttonLogin}
                    onPress={this.onEarlyPaymentClick.bind(this)}
                    >
                    <Text style={styles.buttonTextStyle}>Make Early Payment</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.viewHeight}></View>

          <View style={styles.bankrollDetailView}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={styles.bankrollDetail}>Bankroll Details:</Text>
                 {
                    this.loanStatusText()
                 }
              </View>
              <View style={styles.loanAmountView}>
              <Text style={styles.loanAmountText}>Loan Amount:</Text>
              <Text style={styles.loanAmount}>${this.state.selectedLoanDetail.loan_amt?parseFloat(this.state.selectedLoanDetail.loan_amt).toFixed(2):'0.00'}</Text>
              </View>
              <View style={styles.loanAmountView}>
              <Text style={styles.loanAmountText}>Fee:</Text>
              <Text style={styles.loanAmount}>${this.state.selectedLoanDetail.processingFees?parseFloat(this.state.selectedLoanDetail.processingFees).toFixed(2):'0.00'}</Text>
              </View>

              <View style={styles.loanAmountView}>
              <Text style={styles.totalAmountText}>Total:</Text>
              <Text style={styles.totalAmount}>${this.state.selectedLoanDetail.totalRepayment?parseFloat(this.state.selectedLoanDetail.totalRepayment).toFixed(2):'0.00'}</Text>
              </View>

             
              <View style={styles.loanAmountView}>
              {console.log(this.state.selectedLoanDetail.repaymentDate1)}
              {this.state.selectedLoanDetail.repaymentOption==1?<Text style={styles.totalAmountText}>Payment Date:</Text>:<Text style={styles.totalAmountText}>First Payment Date:</Text>}
              <Text style={styles.loanAmount}>{Moment(this.state.selectedLoanDetail.repaymentDate1).format('MMM DD YYYY')}</Text>
              </View>

              {this.state.selectedLoanDetail.repaymentOption==2?
                               <View style={styles.loanAmountView}>
              <Text style={styles.totalAmountText}>Second Payment Date:</Text>
              <Text style={styles.loanAmount}>{Moment(this.state.selectedLoanDetail.repaymentDate2).format('MMM DD YYYY')}</Text>
              </View>:null

              }



              <View style={styles.bankrollAccDetailView}>
                <Text style={styles.bankrollDetail}>Bank Account Detail:</Text>
                <View style={styles.loanAmountView}>
                <Image
                  style={{marginTop:5,marginLeft:5}}
                  source={require('../res/banklogoloandetail.png')}>
                </Image>
                <View>
                <Text style={styles.bankName}>{this.state.selectedLoanDetail.fundingBankDetailId?this.state.selectedLoanDetail.fundingBankDetailId.bankName:''}</Text>
                <View style={styles.loanAmountView}>
                <Text style={styles.accountNumText}>{this.state.selectedLoanDetail.fundingBankDetailId?this.state.selectedLoanDetail.fundingBankDetailId.type:''}:</Text>
                <Text style={styles.accountNum}>{this.state.selectedLoanDetail.fundingBankDetailId?this.state.selectedLoanDetail.fundingBankDetailId.accountNumber.replace(/\d(?=\d{4})/g, "X"):''}</Text>
                </View>
                </View>
                </View>
              
              </View>
          </View>
          <View style={styles.viewHeight}></View>
          <View style={styles.bankrollDetailView}>
            <Text style={styles.bankrollDetail}>Repayment Details:</Text>
          </View>
          <View style={styles.repaymentView}>
            <View style={styles.loanAmountView}>
            <Text style={styles.repayAmountText}>Repayment Amount:</Text>
            <Text style={styles.repayAmount}>${this.state.selectedLoanDetail.repaymentamt1?parseFloat(this.state.selectedLoanDetail.repaymentamt1).toFixed(2):'0.00'}</Text>
            </View>
            <View style={styles.loanAmountView}>
            <Text style={styles.dueDateTitleText}>Due Date: <Text style={styles.dueDateText}>{Moment(this.state.selectedLoanDetail.repaymentDate1).format('MMM DD YYYY')}</Text></Text>
            <Text style={styles.statusText}>{this.state.selectedLoanDetail.paymentdetail1?this.state.selectedLoanDetail.paymentdetail1.status.toUpperCase():''}</Text>
            </View>
          </View>

          {this.state.selectedLoanDetail.repaymentOption==2?  <View style={styles.repaymentSecondView}>
            <View style={styles.loanAmountView}>
            <Text style={styles.repayAmountText}>Repayment Amount:</Text>
            <Text style={styles.repayAmount}>${this.state.selectedLoanDetail.repaymentamt2?parseFloat(this.state.selectedLoanDetail.repaymentamt2).toFixed(2):'0.00'}</Text>
            </View>
            <View style={styles.loanAmountView}>
            <Text style={styles.dueDateTitleText}>Due Date: <Text style={styles.dueDateText}>{Moment(this.state.selectedLoanDetail.repaymentDate2).format('MMM DD YYYY')}</Text></Text>
            <Text style={styles.statusText}>{this.state.selectedLoanDetail.paymentdetail2?this.state.selectedLoanDetail.paymentdetail2.status.toUpperCase():''}</Text>
            </View>
          </View>:null}

            {this.props.isLoadingEarlyPayment||this.props.isLoadingLoanDetail ?
              <View style={styles.circles}>

                 <Progress.CircleSnail
                   style={styles.progress}
                   thickness={5}
                   size={55}
                   color={[
                     '#FFFFFF',
                     '#FFFFFF',
                     '#FFFFFF',
                   ]}
                 />
             </View> : null
           }
        
        </ScrollView>
        </View>

           {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                        <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
                  </View>:null}  

            {this.state.isShowEarlyPaymentDialog==true?<View style={styles.dialogViewStyle}>
                        <DeleteAlert title='Bankroll' onPressYes={this.onDialogYesButtonClick.bind(this)} onPressNo={this.onDialogNoButtonClick.bind(this)} subtitle={'Are you sure you want to make early payment?'} />
            </View>:null}           
        </Image>
      );
    }
}

const mapStateToProps = ({ earlyPaymentReducer,requestLoanDetailReducer }) => {

  const {isLoadingEarlyPayment,earlyPaymentRes} = earlyPaymentReducer;
  const {isLoadingLoanDetail,responseData} = requestLoanDetailReducer;
  console.log("early payment Output: "+JSON.stringify(earlyPaymentRes));
  console.log("early payment Output: "+JSON.stringify(responseData));
  return {
 
    isLoadingEarlyPayment:isLoadingEarlyPayment,
    earlyPaymentRes:earlyPaymentRes,
    isLoadingLoanDetail:isLoadingLoanDetail,
    responseData:responseData
  }
}
        
export default connect(mapStateToProps,{showLoadingEarlyPayment,clearResponseEarlyPayment,earlyPaymentReq,getLoanDetail,showLoading,clearResponse})(MyLoanDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    paddingTop: 80
  },
  nextPaymentText:{
    color:'#ffffff',
    fontSize: 20,
    textAlign: 'center',
    padding:5,
    paddingTop:(Platform.OS === 'ios') ? 20 : 10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  amountText:{
    color:'#ffffff',
    fontSize: 20,
    fontWeight:'400',
    textAlign: 'center',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  dateText:{
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'center',
    padding:5,
    fontFamily:'FuturaStd-Book',
    paddingBottom:20,
    backgroundColor:'transparent'
  },
  buttonViewStyle:{
    paddingTop:10,
    marginLeft: 20,
    marginRight:20,
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
  viewHeight:{height:1,
    backgroundColor:'#7ACBBC',
    marginTop:15

  },
  bankrollDetail:{
    color:'#ffffff',
    fontSize: 16,
    fontWeight:'bold',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  loanAmountView:{
      flexDirection:'row'

  },
  loanAmountText:{
    flex:1,
    color:'#ffffff',
    fontSize: 14,
    textAlign: 'left',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  loanAmount:{
    flex:1,
    color:'#ffffff',
    fontSize: 14,
    textAlign: 'right',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },

  totalAmountText:{
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    fontWeight:'bold',
    textAlign: 'left',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  totalAmount:{
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    fontWeight:'bold',
    textAlign: 'right',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  bankName:{

    color:'#ffffff',
    fontSize: 14,
    paddingLeft:10,
    paddingTop:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'


  },
  accountNumText:{

    color:'#ffffff',
    fontSize: 14,
    fontWeight:'bold',
    paddingLeft:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  accountNum:{

    color:'#ffffff',
    fontSize: 14,
    fontWeight:'400',
    paddingLeft:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  bankrollDetailView:{
    marginLeft:15,
    marginRight:15,
    marginTop:10
  },
  bankrollAccDetailView:{

    marginTop:10
  },
  repaymentView:{
    backgroundColor:'#fff',
    borderRadius:5,
    marginTop:10,
    marginLeft:15,
    marginRight:15,
		padding:10

  },
	repaymentSecondView:{
		backgroundColor:'#fff',
		borderRadius:5,
		marginTop:10,
		marginLeft:15,
		marginRight:15,
		marginBottom:10,
		padding:10
	},
  repayAmountText:{
    flex:1,
    color:'#000',
    fontSize: 14,
    fontFamily:'FuturaStd-Book',
    textAlign: 'left',
  },
  repayAmount:{
    flex:1,
    color:'#000',
    fontSize: 14,
    fontFamily:'FuturaStd-Book',
    textAlign: 'right',


  },
  statusText:{
    flex:1,
    color:'#FC5622',
    fontSize: 14,
    fontFamily:'FuturaStd-Book',
    textAlign: 'right',
		paddingTop:5
  },
  dueDateText:{

    color:'#427E7B',
    fontSize: 14,
    fontFamily:'FuturaStd-Book',
    textAlign: 'left',
		paddingTop:5

  },
	dueDateTitleText:{

    color:'#000',
    fontSize: 14,
    fontFamily:'FuturaStd-Book',
    textAlign: 'left',
		paddingTop:5
  },
  totalAmount:{
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    fontWeight:'bold',
    textAlign: 'right',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

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
