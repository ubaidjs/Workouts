import React, { useState, useEffect, useContext, useCallback } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../context/AuthContext'
import colors from '../constant/colors'
import global from '../constant/styles'
import Option from '../components/Option'

const Profile = ({ navigation }) => {
	const { signOut } = useContext(AuthContext)
	// const [name, setName] = useState('')
	const [userObj, setUserObj] = useState({})

	useFocusEffect(
		useCallback(() => {
			fetchUserFromStorage()
		}, []),
	)

	const fetchUserFromStorage = async () => {
		let user = await AsyncStorage.getItem('USER')
		user = JSON.parse(user)
		// setName(user.name)
		setUserObj(user)
	}

	const handleSignout = async () => {
		await AsyncStorage.clear()
		signOut()
	}

	const navigateToEdit = () => {
		navigation.navigate('Edit', {
			data: userObj,
		})
	}

	const navigateToMyProfile = () => {
		navigation.navigate('MyProfile', {
			data: userObj,
		})
	}

	return (
		<View style={global.container}>
			<ScrollView>
				<View style={styles.photoWrapper}>
					{/* <View style={styles.photo}> */}
					<Image style={styles.photo} source={{ uri: userObj.avatar }} />
					{/* </View> */}
					<Text style={styles.name}>{userObj.name}</Text>
				</View>
				<View style={styles.optionWrapper}>
					<Option
						iconName="user"
						text="My Profile"
						onPress={navigateToMyProfile}
					/>
					<Option
						iconName="edit"
						text="Edit Profile"
						onPress={navigateToEdit}
					/>
					<Option iconName="shield" text="Privacy Policy" />
					<Option iconName="star" text="Rate App" />
					<Option iconName="share-2" text="Share App" />
					<Option iconName="log-out" text="Log Out" onPress={handleSignout} />
				</View>
			</ScrollView>
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
