import React, { useState, useEffect, useCallback } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableNativeFeedback,
	ScrollView,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import colors from '../constant/colors'
import global from '../constant/styles'

const Home = ({ navigation }) => {
	const [name, setName] = useState('')
	const navigateToScreen = route => {
		navigation.navigate(route)
	}

	useEffect(() => {
		fetchUserFromStorage()
	}, [])

	useFocusEffect(
		useCallback(() => {
			fetchUserFromStorage()
		}, []),
	)

	const fetchUserFromStorage = async () => {
		let user = await AsyncStorage.getItem('USER')
		user = JSON.parse(user)
		setName(user.name)
	}

	return (
		<View style={global.container}>
			<ScrollView>
				<View style={styles.userWrapper}>
					<Text style={styles.hello}>Hello</Text>
					<Text style={styles.name}>{name}</Text>
				</View>
				<View style={styles.main}>
					<TouchableNativeFeedback onPress={() => navigateToScreen('Yoga')}>
						<View style={styles.button}>
							<Image
								style={styles.image}
								source={require('../assets/images/exercise.png')}
							/>
							<Text style={styles.title}>Yoga</Text>
						</View>
					</TouchableNativeFeedback>

					<TouchableNativeFeedback onPress={() => navigateToScreen('Foods')}>
						<View style={styles.button}>
							<Image
								style={styles.image}
								source={require('../assets/images/food.png')}
							/>
							<Text style={styles.title}>Healthy Foods</Text>
						</View>
					</TouchableNativeFeedback>

					<TouchableNativeFeedback
						onPress={() => navigateToScreen('Calculator')}>
						<View style={styles.button}>
							<Image
								style={styles.image}
								source={require('../assets/images/calculator.png')}
							/>
							<Text style={styles.title}>Fitness Calculator</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</ScrollView>
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	userWrapper: {
		padding: 20,
	},
	hello: {
		fontSize: 20,
		fontFamily: 'NotoSans-Regular',
	},
	name: {
		fontSize: 30,
		fontFamily: 'NotoSans-Regular',
	},
	main: {
		margin: 20,
	},
	button: {
		backgroundColor: colors.lightGray,
		marginVertical: 15,
		padding: 20,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		height: 50,
		width: 50,
		marginRight: 15,
	},
	title: {
		fontSize: 20,
		fontFamily: 'NotoSans-Regular',
	},
})
