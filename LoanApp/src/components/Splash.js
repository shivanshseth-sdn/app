import React,{Component} from 'react';
import {
	Image,
	StyleSheet,
	Navigator,
	View
} from 'react-native';
import{ Actions} from 'react-native-router-flux';
export default class Splash extends Component {
	componentWillMount() {
		var navigator = this.props.navigator;
		setTimeout(()=>{

			Actions.Slider();

		},2000);
	}

	render(){

		return(

			<Image style={styles.background}
			 	source={require('../res/splash.png')}>

			</Image>

			);
	}
}
const styles = StyleSheet.create({

	background:{

		    flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        alignItems: 'center',
		    justifyContent: 'center',
	},


});
