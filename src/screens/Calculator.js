import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import global from '../constant/styles'
import Header from '../components/Header'

const Calculator = () => {
	return (
		<View style={global.container}>
			<Header title="Fitness Calculator" />
		</View>
	)
}

export default Calculator

const styles = StyleSheet.create({})
