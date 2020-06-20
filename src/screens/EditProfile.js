import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import Header from '../components/Header'
import global from '../constant/styles'
import Button from '../components/Button'
import AsyncStorage from '@react-native-community/async-storage'
import url from '../constant/api'

const EditProfile = ({ route, navigation }) => {
	const { data } = route.params
	const [name, setName] = useState(data.name)
	const [email, setEmail] = useState(data.email)
	// const [phone, setPhone] = useState(data.phone)
	const [address, setAddress] = useState(data.address)
	const [city, setCity] = useState(data.city)
	const [loading, setLoading] = useState(false)

	const updateProfile = async () => {
		const token = await AsyncStorage.getItem('TOKEN')
		setLoading(true)
		const formData = new FormData()
		formData.append('name', name)
		formData.append('email', email)
		formData.append('address', address)
		formData.append('city', city)
		try {
			const response = await fetch(`${url}profile`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
					Authorization: token,
				},
			})
			const json = await response.json()
			console.log(json)
			setLoading(false)
			if (json.status) {
				await AsyncStorage.setItem('USER', JSON.stringify(json.data))
				ToastAndroid.show('Profile Updated', ToastAndroid.LONG)
				navigation.goBack()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<View style={global.container}>
			<Header title="Edit Profile" />
			<View style={styles.inputWrapper}>
				<TextInput
					value={name}
					placeholder="Full Name"
					style={styles.input}
					onChangeText={val => setName(val)}
				/>
				{/* <TextInput
					value={phone}
					placeholder="Phone Number"
					style={styles.input}
					keyboardType="phone-pad"
					onChangeText={val => setPhone(val)}
					onFocus={() => setValidationErr([])}
				/> */}
				<TextInput
					value={email}
					placeholder="Email"
					style={styles.input}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCompleteType="off"
					onChangeText={val => setEmail(val)}
				/>
				<TextInput
					value={address}
					placeholder="Address"
					style={styles.input}
					onChangeText={val => setAddress(val)}
				/>
				<TextInput
					value={city}
					placeholder="City"
					style={styles.input}
					onChangeText={val => setCity(val)}
				/>
			</View>
			<Button title="SAVE" loading={loading} onPress={updateProfile} />
		</View>
	)
}

export default EditProfile

const styles = StyleSheet.create({
	inputWrapper: {
		padding: 20,
	},
	input: {
		backgroundColor: '#f7f7f7',
		paddingLeft: 10,
		marginVertical: 10,
		borderRadius: 5,
	},
})
