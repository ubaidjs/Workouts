import React, { useContext, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker'
import colors from '../constant/colors'
import Button from '../components/Button'
import url from '../constant/api'

const Signup = ({ navigation }) => {
	const { signIn } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [password, setPassword] = useState('')
	const [photo, setPhoto] = useState({})
	const [validationErr, setValidationErr] = useState([])
	const [errMsg, setErrMsg] = useState('')

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

	const handleSignup = async () => {
		setLoading(true)
		const ext = getMediaType(photo.path || '')

		const formData = new FormData()
		formData.append('name', name)
		formData.append('email', email)
		formData.append('phone', phone)
		formData.append('address', address)
		formData.append('city', city)
		formData.append('password', password)
		//[TypeError: Network request failed]
		if (photo.path) {
			formData.append('avatar', {
				uri: photo.path,
				name: `user.${ext}`,
				type: photo.mime,
			})
		}
		try {
			const response = await fetch(`${url}register`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
					Authorization: '',
				},
			})

			const json = await response.json()
			console.log(json)
			setLoading(false)
			if (json.status === true) {
				Alert.alert(
					'Registration Successful',
					'',
					[
						{
							text: 'Go to Login',
							onPress: () => navigation.navigate('Login'),
						},
					],
					{ cancelable: false },
				)
			} else if (json.status === 'validation_error') {
				// setValidationErr(json.error)
				for (let [key, value] of Object.entries(json.error)) {
					setValidationErr([...validationErr, value])
				}
			}
		} catch (error) {
			setLoading(false)
			setErrMsg('Error signing up. Please try later.')
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.heading}>Join Us</Text>
				<View style={styles.photoWrapper}>
					{photo.path ? (
						<TouchableOpacity onPress={pickImage}>
							<Image style={styles.photo} source={{ uri: photo.path }} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={pickImage}>
							<Image
								style={styles.photo}
								source={{ uri: 'https://i.imgur.com/RYi5Qho.png' }}
							/>
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.inputWrapper}>
					<TextInput
						placeholder="Full Name"
						style={styles.input}
						onChangeText={val => setName(val)}
						onFocus={() => setValidationErr([])}
					/>
					<TextInput
						placeholder="Phone Number"
						style={styles.input}
						keyboardType="phone-pad"
						onChangeText={val => setPhone(val)}
						onFocus={() => setValidationErr([])}
					/>
					<TextInput
						placeholder="Email"
						style={styles.input}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCompleteType="off"
						onChangeText={val => setEmail(val)}
						onFocus={() => setValidationErr([])}
					/>
					<TextInput
						placeholder="Address"
						style={styles.input}
						onChangeText={val => setAddress(val)}
						onFocus={() => setValidationErr([])}
					/>
					<TextInput
						placeholder="City"
						style={styles.input}
						onChangeText={val => setCity(val)}
						onFocus={() => setValidationErr([])}
					/>
					<TextInput
						placeholder="Password"
						style={styles.input}
						secureTextEntry={true}
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType="off"
						onChangeText={val => setPassword(val)}
						onFocus={() => setValidationErr([])}
					/>
					{validationErr.map((item, index) => (
						<Text style={styles.errorMsg} key={index}>
							{item}
						</Text>
					))}
					{/* {validationErr} */}
					<Text style={styles.errorMsg}>{errMsg}</Text>
				</View>
				<View style={styles.line}>
					<Text>Already have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={{ color: colors.linkBlue }}>Login</Text>
					</TouchableOpacity>
				</View>
				<Button loading={loading} title="SIGN UP" onPress={handleSignup} />
			</ScrollView>
		</View>
	)
}

export default Signup

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
	},
	heading: {
		margin: 20,
		fontSize: 30,
		fontFamily: 'NotoSans-Bold',
		color: colors.lightBlack,
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
	inputWrapper: {
		padding: 20,
	},
	input: {
		backgroundColor: '#f7f7f7',
		paddingLeft: 10,
		marginVertical: 10,
		borderRadius: 5,
	},
	line: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	errorMsg: {
		color: 'red',
		textAlign: 'center',
		marginVertical: 10,
	},
})
