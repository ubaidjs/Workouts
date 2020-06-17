import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import global from '../constant/styles'
import Header from '../components/Header'

const Foods = () => {
	return (
		<View style={global.container}>
			<Header title="Healthy Foods" />
		</View>
	)
}

export default Foods

const styles = StyleSheet.create({})
