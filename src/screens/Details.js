import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	ToastAndroid,
	Linking,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../components/Header'
import global from '../constant/styles'
import colors from '../constant/colors'
import url from '../constant/api'

const Details = ({ route }) => {
	const { id, name } = route.params

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchDetails()
	}, [])

	const fetchDetails = async () => {
		setLoading(true)
		const token = await AsyncStorage.getItem('TOKEN')
		const formData = new FormData()
		formData.append('list_id', id)
		try {
			const response = await fetch(`${url}list-details`, {
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

	const handleVideoBtn = () => {
		if (data.video === null) {
			ToastAndroid.show('Video Not Available', ToastAndroid.SHORT)
		} else {
			Linking.openURL(data.video)
		}
	}

	return (
		<View style={global.container}>
			<Header title={name} />
			<ScrollView>
				<View style={styles.main}>
					<View style={styles.imageWrapper}>
						{/* <Image style={styles.image} source={{ uri: yoga.image }} /> */}
					</View>
					<TouchableOpacity onPress={handleVideoBtn}>
						<View style={styles.videoButton}>
							<AntDesign name="playcircleo" size={15} color="white" />
							<Text style={styles.videoText}>Video</Text>
						</View>
					</TouchableOpacity>
					<View style={styles.info}>
						<Text style={styles.heading}>Description</Text>
						<Text style={styles.para}>{data.description}</Text>
					</View>
					{loading && <ActivityIndicator />}
				</View>
			</ScrollView>
		</View>
	)
}

export default Details

const styles = StyleSheet.create({
	main: {
		padding: 20,
	},
	imageWrapper: {
		alignItems: 'center',
		marginVertical: 10,
	},
	image: {
		height: 150,
		width: 150,
	},
	videoButton: {
		backgroundColor: colors.themeColor,
		paddingHorizontal: 15,
		paddingVertical: 8,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 50,
	},
	videoText: {
		color: '#fff',
		marginLeft: 10,
	},
	info: {
		marginVertical: 20,
	},
	heading: {
		fontSize: 18,
		color: colors.lightBlack,
		fontFamily: 'NotoSans-Bold',
	},
	para: {
		fontSize: 16,
		marginVertical: 10,
		fontFamily: 'NotoSans-Regular',
	},
})
