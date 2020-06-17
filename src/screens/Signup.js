import React, { useContext } from 'react'
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

const Signup = ({ navigation }) => {
	const { signIn } = useContext(AuthContext)

	const handleSignup = async () => {
		await AsyncStorage.setItem('TOKEN', '123456')
		signIn({ token: '123456' })
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.heading}>Join Us</Text>
				<View style={styles.photoWrapper}>
					<View style={styles.photo} />
				</View>
				<View style={styles.inputWrapper}>
					<TextInput placeholder="Full Name" style={styles.input} />
					<TextInput
						placeholder="Email"
						style={styles.input}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCompleteType="off"
					/>
					<TextInput
						placeholder="Phone Number"
						style={styles.input}
						keyboardType="phone-pad"
					/>
					<TextInput placeholder="Address" style={styles.input} />
					<TextInput
						placeholder="Password"
						style={styles.input}
						secureTextEntry={true}
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType="off"
					/>
				</View>
				<View style={styles.line}>
					<Text>Already have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={{ color: colors.linkBlue }}>Login</Text>
					</TouchableOpacity>
				</View>
				<Button title="SIGN UP" onPress={handleSignup} />
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
		backgroundColor: '#e9e9e9',
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
})
