import React, { useContext, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import colors from '../constant/colors'
import Button from '../components/Button'
import url from '../constant/api'

const Login = ({ navigation }) => {
	const { signIn } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	const handleLogin = async () => {
		if (!phone || !password) {
			setErrorMsg('Please fill all fields')
			return
		}
		setLoading(true)
		const formData = new FormData()
		formData.append('phone', phone)
		formData.append('password', password)
		try {
			const response = await fetch(`${url}login`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
			})
			const json = await response.json()
			setLoading(false)
			if (json.status) {
				await AsyncStorage.setItem('USER', JSON.stringify(json.data))
				await AsyncStorage.setItem('TOKEN', json.access_token)
				signIn({ token: json.access_token })
			} else {
				setErrorMsg(json.message)
			}
		} catch (error) {
			setLoading(false)
			setErrorMsg(error)
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				{/* <View style={styles.iconWrapper}>
				<View style={styles.icon} />
			</View> */}
				<Text style={styles.heading}>Login</Text>
				<View style={styles.middle}>
					{/* <Text style={styles.loginline}>Login to your account</Text> */}
					<View style={styles.inputWrapper}>
						<TextInput
							placeholder="Phone Number"
							style={styles.input}
							keyboardType="phone-pad"
							autoCapitalize="none"
							autoCompleteType="off"
							onChangeText={val => setPhone(val)}
						/>
						<TextInput
							placeholder="Password"
							style={styles.input}
							secureTextEntry={true}
							autoCapitalize="none"
							autoCorrect={false}
							autoCompleteType="off"
							onChangeText={val => setPassword(val)}
						/>
						<Text style={styles.errorMsg}>{errorMsg}</Text>
					</View>
				</View>
				<View style={styles.line}>
					<Text>Don't have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
						<Text style={{ color: colors.linkBlue }}>Sign Up</Text>
					</TouchableOpacity>
				</View>
				<Button loading={loading} title="LOGIN" onPress={handleLogin} />
			</ScrollView>
		</View>
	)
}

export default Login

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
	iconWrapper: {
		marginVertical: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: 'pink',
	},
	loginline: {
		fontFamily: 'NotoSans-Regular',
		fontSize: 18,
		paddingHorizontal: 20,
	},
	inputWrapper: {
		padding: 20,
		// marginBottom: 50,
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
