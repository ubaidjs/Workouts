import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableNativeFeedback,
	ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Feather from 'react-native-vector-icons/Feather'
import global from '../constant/styles'
import Header from '../components/Header'
import colors from '../constant/colors'
import url from '../constant/api'

const arr = [1, 2, 3, 4, 5, 6, 7]

const Yoga = ({ navigation }) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchCategory()
	}, [])

	const fetchCategory = async () => {
		setLoading(true)
		const token = await AsyncStorage.getItem('TOKEN')
		try {
			const response = await fetch(`${url}category`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
					Authorization: token,
				},
			})
			const json = await response.json()
			setLoading(false)
			json.data && setData(json.data)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<View style={global.container}>
			<Header title="Yoga" />
			<ScrollView>
				<View style={styles.dayWrapper}>
					{loading && <ActivityIndicator />}
					{data.map(el => {
						return (
							<TouchableNativeFeedback
								key={el.id}
								onPress={() => {
									navigation.navigate('Category', {
										id: el.id,
										name: el.category,
									})
								}}>
								<View style={styles.day}>
									<Text style={styles.text}>{el.category}</Text>
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
