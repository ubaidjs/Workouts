import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../constant/colors'

const Header = ({ title, noBack }) => {
	const navigation = useNavigation()
	return (
		<View style={styles.container}>
			<View style={styles.ends}>
				{noBack ? null : (
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Feather name="chevron-left" size={25} color={colors.lightBlack} />
					</TouchableOpacity>
				)}
			</View>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.ends} />
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: colors.darkGray,
	},
	ends: {
		width: '15%',
	},
	title: {
		fontSize: 20,
		fontFamily: 'NotoSans-Bold',
		color: colors.lightBlack,
	},
})
