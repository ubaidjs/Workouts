import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableNativeFeedback,
	ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Feather from 'react-native-vector-icons/Feather'
import Header from '../components/Header'
import global from '../constant/styles'
import colors from '../constant/colors'
import url from '../constant/api'

const Category = ({ route, navigation }) => {
	const { id, name } = route.params

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchCategoryList()
	}, [])

	const fetchCategoryList = async () => {
		setLoading(true)
		const token = await AsyncStorage.getItem('TOKEN')
		const formData = new FormData()
		formData.append('category_id', id)
		try {
			const response = await fetch(`${url}list`, {
				method: 'POST',
				body: formData,
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
			<Header title={name} />
			<ScrollView>
				<View style={styles.exerciseWrapper}>
					{loading && <ActivityIndicator />}
					{data.map(el => {
						return (
							<TouchableNativeFeedback
								key={el.id}
								onPress={() =>
									navigation.navigate('Details', {
										id: el.id,
										name: el.name,
									})
								}>
								<View style={styles.exercise}>
									{/* <Image style={styles.image} source={{ uri: el.image }} /> */}
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

export default Category

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
		padding: 20,
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
