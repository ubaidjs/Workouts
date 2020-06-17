import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import global from '../constant/styles'
import Header from '../components/Header'

const Foods = () => {
	return (
		<View style={global.container}>
			<Header title="Healthy Foods" />
			<View style={styles.main}>
				<Text style={styles.comingSoon}>Coming Soon</Text>
			</View>
		</View>
	)
}

export default Foods

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	comingSoon: {
		fontSize: 20,
		color: 'gray',
	},
})
