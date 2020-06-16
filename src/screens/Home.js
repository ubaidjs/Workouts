import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableNativeFeedback,
	ScrollView,
} from 'react-native'
import colors from '../constant/colors'
import global from '../constant/styles'

const Home = () => {
	return (
		<View style={global.container}>
			<ScrollView>
				<View style={styles.userWrapper}>
					<Text style={styles.hello}>Hello</Text>
					<Text style={styles.name}>Victoria Doe</Text>
				</View>
				<View style={styles.main}>
					<TouchableNativeFeedback>
						<View style={styles.button}>
							<Image
								style={styles.image}
								source={require('../assets/images/exercise.png')}
							/>
							<Text style={styles.title}>Workouts</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback>
						<View style={styles.button}>
							<Image
								style={styles.image}
								source={require('../assets/images/food.png')}
							/>
							<Text style={styles.title}>Healthy Foods</Text>
						</View>
					</TouchableNativeFeedback>

					<TouchableNativeFeedback>
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
		backgroundColor: '#f7f7f7',
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
