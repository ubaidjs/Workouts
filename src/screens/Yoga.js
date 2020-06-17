import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableNativeFeedback,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import global from '../constant/styles'
import Header from '../components/Header'
import colors from '../constant/colors'

const arr = [1, 2, 3, 4, 5, 6, 7]

const Yoga = ({ navigation }) => {
	return (
		<View style={global.container}>
			<Header title="Yoga" />
			<ScrollView>
				<View style={styles.dayWrapper}>
					{arr.map(el => {
						return (
							<TouchableNativeFeedback
								key={el}
								onPress={() => {
									navigation.navigate('Category', {
										category: el,
									})
								}}>
								<View style={styles.day}>
									<Text style={styles.text}>Category {el}</Text>
									<Feather
										name="chevron-right"
										size={20}
										color={colors.linkBlue}
									/>
								</View>
							</TouchableNativeFeedback>
						)
					})}
				</View>
			</ScrollView>
		</View>
	)
}

export default Yoga

const styles = StyleSheet.create({
	dayWrapper: {
		padding: 20,
	},
	day: {
		padding: 20,
		backgroundColor: colors.lightGray,
		marginVertical: 10,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 18,
		fontFamily: 'NotoSans-Regular',
		color: colors.lightBlack,
	},
})
