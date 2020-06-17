import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import global from '../constant/styles'
import colors from '../constant/colors'

const Details = ({ route }) => {
	const { title } = route.params
	return (
		<View style={global.container}>
			<Header title={title} />
		</View>
	)
}

export default Details

const styles = StyleSheet.create({})
