import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
	ActivityIndicator,
} from 'react-native'
import colors from '../constant/colors'

const Button = ({ title, onPress, loading }) => {
	return (
		<TouchableNativeFeedback onPress={onPress}>
			<View style={styles.button}>
				{loading ? (
					<ActivityIndicator color="#fff" style={styles.loader} />
				) : (
					<Text style={styles.buttonText}>{title}</Text>
				)}
			</View>
		</TouchableNativeFeedback>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.themeColor,
		margin: 20,
		borderRadius: 10,
	},
	buttonText: {
		padding: 10,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'NotoSans-Bold',
	},
	loader: {
		padding: 10,
	},
})
