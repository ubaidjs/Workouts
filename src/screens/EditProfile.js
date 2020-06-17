import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import global from '../constant/styles'

const EditProfile = () => {
	return (
		<View style={global.container}>
			<Header title="Edit Profile" />
		</View>
	)
}

export default EditProfile

const styles = StyleSheet.create({})
