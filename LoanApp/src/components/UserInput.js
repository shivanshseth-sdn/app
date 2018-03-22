import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';

export default class UserInput extends Component {
	render() {
		return (
			<View style={styles.inputWrapper}>
				<Image source={this.props.source}
					style={styles.inlineImg} />

				<FloatingLabel
						labelStyle={styles.labelInput}
						inputStyle={styles.input}
						style={styles.formInput}
						underlineColorAndroid='transparent'
						secureTextEntry={this.props.secureTextEntry}
						onChangeText={this.props.onChangeText}
						value={this.props.value}
						autoCapitalize='none'
						autoCorrect={false}
						returnKeyType={this.props.returnKeyType}
						keyboardType={this.props.keyboardType}
					>{this.props.placeholder}</FloatingLabel>
			</View>
		);
	}
}

UserInput.propTypes = {
	source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	secureTextEntry: PropTypes.bool,
	onChangeText:PropTypes.func,
	value:PropTypes.string,
	keyboardType:PropTypes.string,
	returnKeyType:PropTypes.string,
	


};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({

	inputWrapper: {

		marginTop:10
	},
	inlineImg: {
		position: 'absolute',
		left: 20,
		bottom:16

	},
	labelInput: {
		color: '#FFFFFF',
		paddingLeft:30,
		fontSize:18,
		fontFamily:'FuturaStd-Book',
		backgroundColor:'transparent'

	},
	formInput: {
		borderBottomWidth: 1,
		marginLeft: 20,
		marginRight:20,
		borderColor: '#FFFFFF',
		alignSelf: 'stretch',

	},
	input: {
		borderWidth: 0,
		paddingLeft:30,
		fontSize:18,
		fontFamily:'FuturaStd-Book',
		color:'#ffffff',
	},
});
