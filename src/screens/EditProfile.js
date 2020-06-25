import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ToastAndroid,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native'
import Header from '../components/Header'
import global from '../constant/styles'
import Button from '../components/Button'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker'
import url from '../constant/api'

const EditProfile = ({ route, navigation }) => {
	const { data } = route.params
	const [name, setName] = useState(data.name)
	const [email, setEmail] = useState(data.email)
	// const [phone, setPhone] = useState(data.phone)
	const [address, setAddress] = useState(data.address)
	const [city, setCity] = useState(data.city)
	const [photo, setPhoto] = useState({})
	const [loading, setLoading] = useState(false)

	const getMediaType = uri => uri.split('.').slice(-1)

	const pickImage = () => {
		ImagePicker.openPicker({
			width: 400,
			height: 400,
			cropping: true,
		})
			.then(image => {
				setPhoto(image)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const updateProfile = async () => {
		setLoading(true)
		const ext = getMediaType(photo.path || '')

		const token = await AsyncStorage.getItem('TOKEN')

		const formData = new FormData()
		formData.append('name', name)
		formData.append('email', email)
		formData.append('address', address)
		formData.append('city', city)
		if (photo.path) {
			formData.append('avatar', {
				uri: photo.path,
				name: `user.${ext}`,
				type: photo.mime,
			})
		}
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
			} else {
				ToastAndroid.show('Error! Please try later', ToastAndroid.LONG)
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
			<ScrollView>
				<View style={styles.photoWrapper}>
					{photo.path ? (
						<TouchableOpacity onPress={pickImage}>
							<Image style={styles.photo} source={{ uri: photo.path }} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={pickImage}>
							<Image style={styles.photo} source={{ uri: data.avatar }} />
						</TouchableOpacity>
					)}
					<Text style={styles.changeText}>Change Photo</Text>
				</View>
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
			</ScrollView>
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
	photoWrapper: {
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	photo: {
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	changeText: {
		marginTop: 10,
		color: 'gray',
	},
})
