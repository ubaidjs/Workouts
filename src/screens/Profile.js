import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import colors from '../constant/colors'

const Profile = () => {
	const { signOut } = useContext(AuthContext)
	const handleSignout = async () => {
		await AsyncStorage.clear()
		signOut()
	}
	return (
		<View>
			<Text>Profile</Text>
			<Button title="Signout" onPress={handleSignout} />
		</View>
	)
}

export default Profile

const styles = StyleSheet.create({})
