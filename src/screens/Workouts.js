import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import global from '../constant/styles'
import Header from '../components/Header'

const Workouts = () => {
	return (
		<View style={global.container}>
			<Header title="Workouts" />
		</View>
	)
}

export default Workouts

const styles = StyleSheet.create({})
