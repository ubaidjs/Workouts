import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import colors from '../constant/colors'
import global from '../constant/styles'

const Home = () => {
	const { signOut } = useContext(AuthContext)

	const handleSignout = async () => {
		await AsyncStorage.clear()
		signOut()
	}

	return (
		<View style={global.container}>
			<Text>Home</Text>
			<Button title="Signout" onPress={handleSignout} />
		</View>
	)
}

export default Home

const styles = StyleSheet.create({})
