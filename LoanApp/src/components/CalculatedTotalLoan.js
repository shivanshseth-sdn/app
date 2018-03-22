import React,{Component} from 'react';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
	AsyncStorage,
  Platform
} from 'react-native';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import {Card} from './common';
import {CardWithWhiteBG} from './common';
import CheckBox from 'react-native-checkbox';
import Moment from 'moment';

class CalculatedTotalLoan extends Component{

	constructor() {
			super();
			let _loan_amt;
			let _fee;
			let _emi1Amount;
			let _emi2Amount;
			let _totalAmount;
			let _paymentDate1;
			let _paymentDate2;
			let _paymentOption;
			AsyncStorage.getItem("calculatedAmount").then((value) => {
				if(value) {

						console.log('qualificationRes if='+value);
						let obj = JSON.parse(value);
						_loan_amt=obj.loan_amt;
						_fee=obj.fees;
						_paymentOption=obj.repaymentOption;
						_paymentDate1=obj.repaymentDate1;
						_paymentDate2=obj.repaymentDate2;
						_emi1Amount=obj.repaymentamt1;
						_emi2Amount=obj.repaymentamt2;
						_totalAmount=obj.totalRepayment;

						this.setState({loan_amt: _loan_amt,
						fee: _fee,
						emi1Amount: _emi1Amount,
						emi2Amount: _emi2Amount,
						totalAmount: _totalAmount,
						paymentDate1: _paymentDate1,
						paymentDate2: _paymentDate2,
						paymentOption:_paymentOption
						});
						console.log(' qualificationRes componentWillReceiveProps ====>>>> '+obj.qualified_amt);
				}
				else {

						console.log('qualificationRes else='+value);
				}
			}).done();
      AsyncStorage.getItem("bankDetails").then((value) => {
        if(value) {

            console.log('bankDetails if='+value);
            let obj = JSON.parse(value);
          
            this.setState({bankDetail: obj});
          
        }
        else {

            console.log('bankDetails else='+value);
        }
      }).done();


     
			this.state = {

				loan_amt: 0,
				fee: 0,
				emi1Amount: 0,
				emi2Amount: 0,
				totalAmount: 0,
				paymentDate1: '',
				paymentDate2: '',
				paymentOption:0,
        bankDetail:'',
        checkboxAgree:true,
          errorMsg: '',

			};

	}


    componentWillMount(){
     

    }

    onNextClick=()=>{
   

       Actions.Agreement();
     
    }

		setRepayData(){
			if(this.state.paymentOption==1){
				return(
					<View>
						<View style={styles.termText3}>
							<Text style={styles.dateText}>{this.state.paymentDate1}</Text>
							<Text style={styles.amountText}>${this.state.emi1Amount?parseFloat(this.state.emi1Amount).toFixed(2):'0.00'}</Text>
						</View>

					</View>
				)



			}
			else if(this.state.paymentOption==2){
				return(
					<View>
						<View style={styles.termText}>
							<Text style={styles.dateText}>{this.state.paymentDate1}</Text>
							<Text style={styles.amountText}>${this.state.emi1Amount?parseFloat(this.state.emi1Amount).toFixed(2):'0.00'}</Text>
						</View>
						<View style={styles.termText2}>
							<Text style={styles.dateText}>{this.state.paymentDate2}</Text>
							<Text style={styles.amountText}>${this.state.emi2Amount?parseFloat(this.state.emi2Amount).toFixed(2):'0.00'}</Text>
						</View>
					</View>
				)
			}
		}

    render(){
      return(

        <Image style={styles.container}
          source={require('../res/bg.png')}>
          <View>
    
          <ScrollView contentContainerStyle={{paddingBottom:50}}>
          <View >
                  <View >
                    <Text style={styles.forgotText}>Loan Amount</Text>
                  </View>
                  <View >
                    <Text style={styles.codeText}>${this.state.loan_amt?parseFloat(this.state.loan_amt).toFixed(2):'0.00'}</Text>
                  </View>

          </View>

          <View style={styles.viewHeight}></View>
          <View style={styles.bankrollDetailView}>

              <Text style={styles.bankrollDetail}>Bankroll Details:</Text>
              <View style={styles.loanAmountView}>
              <Text style={styles.loanAmountText}>Loan Amount:</Text>
              <Text style={styles.loanAmount}>${this.state.loan_amt?parseFloat(this.state.loan_amt).toFixed(2):'0.00'}</Text>
              </View>
              <View style={styles.loanAmountView}>
              <Text style={styles.loanAmountText}>Fee:</Text>
              <Text style={styles.loanAmount}>${this.state.fee?parseFloat(this.state.fee).toFixed(2):'0.00'}</Text>
              </View>

              <View style={styles.loanAmountView}>
              <Text style={styles.totalAmountText}>Total:</Text>
              <Text style={styles.totalAmount}>${this.state.totalAmount?parseFloat(this.state.totalAmount).toFixed(2):'0.00'}</Text>
              </View>
             
              <View style={styles.loanAmountView}>
              {this.state.paymentOption==1?<Text style={styles.totalAmountText}>Payment Date:</Text>:<Text style={styles.totalAmountText}>First Payment Date:</Text>}
              <Text style={styles.loanAmount}>{Moment(this.state.paymentDate1).format('MMM DD YYYY')}</Text>
              </View>

              {this.state.paymentOption==2?
                               <View style={styles.loanAmountView}>
              <Text style={styles.totalAmountText}>Second Payment Date:</Text>
              <Text style={styles.loanAmount}>{Moment(this.state.paymentDate2).format('MMM DD YYYY')}</Text>
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
                <Text style={styles.bankName}>{this.state.bankDetail.bankName}</Text>

                <View style={styles.loanAmountView}>
                <Text style={styles.accountNumText}>{this.state.bankDetail.type}: </Text>
                <Text style={styles.accountNum}>{this.state.bankDetail?this.state.bankDetail.accountNumber.replace(/\d(?=\d{4})/g, "X"):''}</Text>
                </View>
                </View>
                </View>
              </View>

          </View>

          <View style={styles.viewHeight}></View>
         {/* <View style={styles.socialContainer}>

            <View style={styles.cardsContainer}>
              <Card>
                <View style={styles.termText2}>
                  <Text style={styles.feeText}>Fee</Text>
                  <Text style={styles.feeAmountText}>${this.state.fee}</Text>
                </View>
              </Card>

              <CardWithWhiteBG>

                <Text style={styles.scheudleText}>Schedule Payment Dates</Text>
								{this.setRepayData()}

              </CardWithWhiteBG>

              <Card>
                <View style={styles.termText2}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalAmountText}>${this.state.totalAmount}</Text>
                </View>
              </Card>
            </View>*/}



            <View style={styles.checkboxView}>
                 
                    <Text style={styles.checkboxlablel}>I agree to automatic repayments from this account on these dates.</Text>
            </View>

            {
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
            }

            <View style={styles.buttonViewStyle}>


                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.onNextClick}
                  >
                  <Text style={styles.buttonTextStyle}>Get Cash</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
        </Image>
      );
    }
}
export default CalculatedTotalLoan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    paddingTop: 80
  },
  referCodeContainer:{
    flex:1.2,
    alignItems:'center',
     justifyContent: 'center', 

  },
  socialContainer:{

    flex:3,
    backgroundColor:'#ffffff',
  },

  forgotText: {
    color:'#ffffff',
    fontSize: 25,
    textAlign: 'center',
    paddingTop:(Platform.OS === 'ios') ? 20 : 10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  codeText: {
    color:'#ffffff',
    fontSize: 50,
    fontWeight:'400',
    textAlign: 'center',
    alignItems:'center',
    paddingTop:10,
    marginBottom:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },

  infoText: {

    color:'#000',
    fontSize: 20,
    fontWeight:'400',
    textAlign: 'center',
    alignItems:'center',
    paddingTop:50,
    fontFamily:'FuturaStd-Book',
  },
  calculateAmountText:{
    color:'#427E7B',
    fontSize: 35,
    fontWeight:'400',
    textAlign: 'center',
    alignItems:'center',
    fontFamily:'FuturaStd-Book',

  },
  cardsContainer:{
    marginLeft:10,
    marginRight:10,
    paddingTop:20
  },

  loanCalculateContainer:{
    flexDirection:'row',
    paddingTop:50,
    justifyContent:'center',
    marginLeft:50,
    marginRight:50
  },
  buttonViewStyle:{
    paddingTop:30,
    marginLeft: 20,
    marginRight:20,
    alignSelf: 'stretch',
  },
  feeText: {
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    paddingLeft:15,
    textAlign: 'left',
    fontFamily:'FuturaStd-Book',
  },
  scheudleText: {

    color:'#3A393E',
    fontSize: 18,
    fontFamily:'FuturaStd-Book',
    paddingLeft:15,
    paddingTop:15

  },
  feeAmountText: {
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    fontFamily:'FuturaStd-Book',
    textAlign: 'right',
    paddingRight:15
  },

  totalText: {
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    paddingLeft:15,
    fontFamily:'FuturaStd-Book',
    fontWeight:'400',
    textAlign: 'left',
  },

  totalAmountText: {
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    fontWeight:'400',
    fontFamily:'FuturaStd-Book',
    textAlign: 'right',
    paddingRight:15
  },

  dateText: {
    flex:1,
    color:'#3A393E',
    fontSize: 16,
    paddingLeft:15,
    fontFamily:'FuturaStd-Book',
    textAlign: 'left',
  },

  amountText: {
    flex:1,
    color:'#417C78',
    fontSize: 16,
    fontWeight:'400',
    textAlign: 'right',
    fontFamily:'FuturaStd-Book',
    paddingRight:15
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
  termText:{flexDirection:'row',paddingTop:15},
	termText3:{flexDirection:'row',paddingTop:15,paddingBottom:15},
  termText2:{flexDirection:'row',paddingTop:15,paddingBottom:15},
  viewHeight:{height:1,
    backgroundColor:'#7ACBBC',
    marginTop:15

  },
   bankrollDetailView:{
    marginLeft:15,
    marginRight:15,
    marginTop:20
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
   checkboxView:{
      flexDirection:'row',
       marginLeft:20,
    marginRight:20,
    marginTop:20

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
  bankrollAccDetailView:{

    marginTop:10
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
    
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
bankName:{

    color:'#ffffff',
    fontSize: 14, 
    paddingTop:10,
    paddingLeft:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'


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

  checkboxlablel:{color:'#FFFFFF', backgroundColor:'transparent',fontSize:14,fontFamily:'FuturaStd-Book'},


});
