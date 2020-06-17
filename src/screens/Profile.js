import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import colors from '../constant/colors'
import global from '../constant/styles'
import Option from '../components/Option'

const Profile = ({ navigation }) => {
	const { signOut } = useContext(AuthContext)

	const handleSignout = async () => {
		await AsyncStorage.clear()
		signOut()
	}

	const navigateToEdit = () => {
		navigation.navigate('Edit')
	}

	return (
		<View style={global.container}>
			<View style={styles.photoWrapper}>
				<View style={styles.photo} />
				<Text style={styles.name}>Victoria Doe</Text>
			</View>
			<View style={styles.optionWrapper}>
				<Option iconName="edit" text="Edit Profile" onPress={navigateToEdit} />
				<Option iconName="shield" text="Privacy Policy" />
				<Option iconName="star" text="Rate App" />
				<Option iconName="share-2" text="Share App" />
				<Option iconName="log-out" text="Log Out" onPress={handleSignout} />
			</View>
		</View>
	)
}

export default Profile

const styles = StyleSheet.create({
	photoWrapper: {
		alignItems: 'center',
		marginVertical: 30,
	},
	photo: {
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: '#e9e9e9',
	},
	name: {
		fontSize: 22,
		fontFamily: 'NotoSans-Bold',
		color: colors.lightBlack,
		marginTop: 15,
	},
	optionWrapper: {
		paddingHorizontal: 20,
		flex: 1,
	},
})
