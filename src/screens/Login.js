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

const Login = ({ navigation }) => {
	const { signIn } = useContext(AuthContext)

	const handleLogin = async () => {
		await AsyncStorage.setItem('TOKEN', '123456')
		signIn({ token: '123456' })
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
						/>
						<TextInput
							placeholder="Password"
							style={styles.input}
							secureTextEntry={true}
							autoCapitalize="none"
							autoCorrect={false}
							autoCompleteType="off"
						/>
					</View>
				</View>
				<View style={styles.line}>
					<Text>Don't have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
						<Text style={{ color: colors.linkBlue }}>Sign Up</Text>
					</TouchableOpacity>
				</View>
				<Button title="LOGIN" onPress={handleLogin} />
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
		marginBottom: 50,
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
