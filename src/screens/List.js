import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableNativeFeedback,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import global from '../constant/styles'
import colors from '../constant/colors'
import Header from '../components/Header'
import { exercise } from '../constant/data'

const List = ({ navigation }) => {
	return (
		<View style={global.container}>
			<Header title="Exercise List" noBack={true} />
			<ScrollView>
				<View style={styles.exerciseWrapper}>
					{exercise.map(el => {
						return (
							<TouchableNativeFeedback
								key={el.id}
								onPress={() =>
									navigation.navigate('Details', {
										yoga: el,
									})
								}>
								<View style={styles.exercise}>
									<Image style={styles.image} source={{ uri: el.image }} />
									<Text style={styles.name}>{el.name}</Text>
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

export default List

const styles = StyleSheet.create({
	exerciseWrapper: {
		padding: 20,
	},
	exercise: {
		backgroundColor: '#f7f7f7',
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		padding: 15,
	},
	image: {
		height: 60,
		width: 60,
		marginRight: 15,
	},
	name: {
		fontSize: 16,
		fontFamily: 'NotoSans-Regular',
		flex: 1,
	},
})
