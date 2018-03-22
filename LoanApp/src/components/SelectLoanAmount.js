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
	Alert,
  Platform
} from 'react-native';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';

class SelectLoanAmount extends Component{

			constructor() {
					super();
					let loan_amt;
					AsyncStorage.getItem("userData").then((value) => {
						if(value) {

								console.log('qualificationRes if='+value);
								let obj = JSON.parse(value);
								loan_amt=obj.qualified_amt;
								this.setState({loanAmount:loan_amt});
								console.log(' qualificationRes componentWillReceiveProps ====>>>> '+obj.qualified_amt);
						}
						else {

								console.log('qualificationRes else='+value);
						}
					}).done();
					this.state = {
						loanAmount: loan_amt,
						minAmount:50,
            errorMsg:''
					};
					console.log('constructor ==='+this.state.loanAmount);
			}


    onNextClick=()=>{
			if(this.state.minAmount>=50){
				AsyncStorage.setItem("loanAmount", String(this.state.minAmount));
				Actions.RepaymentSchedule();
        this.setState({errorMsg:''});
			}
			else{
        this.setState({errorMsg:'Please select minimum amount to borrow.'});
				//Alert.alert('Please select minimum amout to borrow.');
			}

    }

		increamentLoanAmount(minAmount,loanAmount){
         this.setState({errorMsg:''});
				if(minAmount<loanAmount){
					minAmount=minAmount+50;
					this.setState({minAmount:minAmount});
				}
		}
		dicrementAmount(minAmount,loanAmount){
       this.setState({errorMsg:''});
			if(minAmount>50){
				minAmount=minAmount-50;
				this.setState({minAmount:minAmount});
			}
		}
        componentWillMount(){

    }



    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>

          <View style={styles.referCodeContainer}>
                  <View >
                    <Text style={styles.forgotText}>Credit Available</Text>
                  </View>
                  <View >
                    <Text style={styles.codeText}>${this.state.loanAmount?parseFloat(this.state.loanAmount).toFixed(2):''}</Text>
                  </View>

          </View>
          <View style={styles.socialContainer}>
            <View >
              <Text style={styles.infoText}>How much would you like to borrow?</Text>
            </View>
            <View style={styles.loanCalculateContainer}>

							<TouchableOpacity onPress={this.dicrementAmount.bind(this,this.state.minAmount,this.state.loanAmount)}>
                <Image
                  source={require('../res/decreament.png')}>
                </Image>
							</TouchableOpacity>
                <View style={{flex:1}}>
                  <Text style={styles.calculateAmountText}>${this.state.minAmount?parseFloat(this.state.minAmount).toFixed(2):'0.00'}</Text>
                </View>

								<TouchableOpacity onPress={this.increamentLoanAmount.bind(this,this.state.minAmount,this.state.loanAmount)}>
	                <Image
	                  source={require('../res/increament.png')}>
	                </Image>
								</TouchableOpacity>
            </View>
                    {
                      this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                    }

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.onNextClick}
                  >
                  <Text style={styles.buttonTextStyle}>Next</Text>
              </TouchableOpacity>
            </View>

          </View>

        </Image>
      );
    }
}
export default SelectLoanAmount;
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
    flex:1.2,
    alignItems:'center',
    justifyContent:'center',
  },
  socialContainer:{
    flex:3,
    backgroundColor:'#ffffff',
  },

  forgotText: {
    color:'#ffffff',
    fontSize: 25,
    textAlign: 'center',
   
    fontFamily:'FuturaStd-Book',
       backgroundColor:'transparent'
  },
  codeText: {
    color:'#ffffff',
    fontSize: 50,
    fontWeight:'400',
    textAlign: 'center',
    alignItems:'center',
    paddingTop:20,
    fontFamily:'FuturaStd-Book',
       backgroundColor:'transparent'
  },

  infoText: {

    color:'#000',
    fontSize: 18,
    fontWeight:'400',
    textAlign: 'center',
    alignItems:'center',
    paddingTop:50,
    fontFamily:'FuturaStd-Book',
       backgroundColor:'transparent'
  },
  calculateAmountText:{
    color:'#427E7B',
    fontSize: 35,
    fontWeight:'400',
    fontFamily:'FuturaStd-Book',
    textAlign: 'center',
    alignItems:'center',

  },

  loanCalculateContainer:{
    flexDirection:'row',
    paddingTop:50,
    justifyContent:'center',
    marginLeft:50,
    marginRight:50
  },
  buttonViewStyle:{
    paddingTop:60,
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

});
