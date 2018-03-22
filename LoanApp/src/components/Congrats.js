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
  InteractionManager,
  Platform
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import {Card} from './common';

class Congrats extends Component{


	constructor() {
			super();
			this.state = {
				loanAmount: '',
        userName:''

			};

			console.log('congrats constructor ==='+this.state.loanAmount);
	}

  componentWillMount(){

        console.log('congrats componentWillMount ==== ');
    }
  componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
          this.getUserData()
      });
  }
  

    onSkipClick=()=>{
      Actions.Dashboard({type: "reset"});
    }
		onGetCashClick=()=>{
			Actions.SelectLoanAmount();
		}

    getUserData(){
      //let loan_amt;
      AsyncStorage.getItem("userData").then((value) => {
        if(value) {

         
            var obj = JSON.parse(value);
          
            loan_amt=obj.qualified_amt;
            this.setState({loanAmount:loan_amt});
            

            if(obj.firstname==undefined&&obj.lastname==undefined){
                  this.setState({userName:'Bankroll'})
            }
            else{
                this.setState({userName:obj.username})
            }
            if(obj.qualified_amt!=''&&obj.qualified_amt!=undefined){
                this.setState({loanAmount:obj.qualified_amt})
            }
           
        }
        else {

            console.log('congrats qualificationRes else='+value);
        }
      }).done();
      
    }


    render(){
      return(
        <Image style={styles.container}
          source={require('../res/congrats.png')}>
          <ScrollView>
            <View>
            <View style={styles.welcomeContainer}>
                <Text style={styles.CongratsText}>Congrats,</Text>
                <Text style={styles.CongratsText}>{this.state.userName}!</Text>
            </View>
            <View>
              <Text style={styles.forgotDetailText}>Bankroll would like to offer you the following line of credit:</Text>
            </View>

            <View style={styles.cardViewMainContainer}>
              <View >
                <Card >
                  <Text style={styles.cardText}>${this.state.loanAmount?parseFloat(this.state.loanAmount).toFixed(2):'0.00'}</Text>
                </Card>
              </View>
            </View>

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.onGetCashClick}
                  >
                  <Text style={styles.buttonTextStyle}>Get Cash</Text>
              </TouchableOpacity>
            </View>


            <View>
              <Text style={styles.forgotDetailText}
              onPress={this.onSkipClick}
              >Skip & Continue</Text>
            </View>

            </View>
          </ScrollView>
        </Image>
      );
    }
}
export default Congrats;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent:'center',
    resizeMode: 'cover',
    paddingTop: 70
  },
  CongratsText: {
    color:'#ffffff',
    fontSize: 24,
    textAlign: 'center',
    marginTop:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
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
    fontSize: 18,
    textAlign: 'center',
    paddingTop:40,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent',
     lineHeight:(Platform.OS === 'ios') ? 0 : 25,

  },

  buttonViewStyle:{
    marginTop:50,
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
        fontFamily:'FuturaStd-Book'
  },
  linkAccountImageContainer:{

    alignItems:'center'
  },
  cardText:{
    color:'#ffffff',
    fontSize: 40,
    fontWeight: '500',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    paddingBottom:10,
    fontFamily:'FuturaStd-Book',
    alignSelf: 'center',
  },
  cardViewMainContainer:{
    marginTop:50,
    alignItems:'center',
    justifyContent:'center',
    
  },


});
