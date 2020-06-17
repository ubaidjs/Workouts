import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../constant/colors'

const Option = ({ iconName, text, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.option}>
				<Feather name={iconName} size={22} color="gray" />
				<Text style={styles.optionText}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Option

const styles = StyleSheet.create({
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 8,
	},
	optionText: {
		marginLeft: 15,
		fontSize: 18,
		fontFamily: 'NotoSans-Regular',
		paddingTop: 3,
		color: colors.lightBlack,
	},
})
