import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ToastAndroid,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native'
import Header from '../components/Header'
import global from '../constant/styles'
import Button from '../components/Button'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker'
import url from '../constant/api'
import colors from '../constant/colors'

const EditProfile = ({ route, navigation }) => {
	const { data } = route.params

	return (
		<View style={global.container}>
			<Header title="My Profile" />
			<ScrollView>
				<View style={styles.photoWrapper}>
					<Image style={styles.photo} source={{ uri: data.avatar }} />
					<Text style={styles.name}>{data.name}</Text>
				</View>
				<View style={styles.infoWrapper}>
					<View style={styles.info}>
						<Text style={styles.label}>Phone: </Text>
						<Text style={styles.value}>{data.phone}</Text>
					</View>

					<View style={styles.info}>
						<Text style={styles.label}>Email: </Text>
						<Text style={styles.value}>{data.email}</Text>
					</View>

					<View style={styles.info}>
						<Text style={styles.label}>Address: </Text>
						<Text style={styles.value}>{data.address}</Text>
					</View>

					<View style={styles.info}>
						<Text style={styles.label}>City: </Text>
						<Text style={styles.value}>{data.city}</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default EditProfile

const styles = StyleSheet.create({
	inputWrapper: {
		padding: 20,
	},
	photoWrapper: {
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	photo: {
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	infoWrapper: {
		margin: 20,
		// borderWidth: 0.5,
		// borderColor: 'gray',
		// borderRadius: 10,
	},
	label: {
		fontWeight: 'bold',
		fontFamily: 'NotoSans-Regular',
		fontSize: 18,
		width: '30%',
	},
	value: {
		fontFamily: 'NotoSans-Regular',
		fontSize: 18,
		width: '70%',
	},
	info: {
		flexDirection: 'row',
		padding: 20,
		paddingVertical: 10,
	},
	name: {
		fontSize: 22,
		fontFamily: 'NotoSans-Bold',
		color: colors.lightBlack,
		marginTop: 15,
	},
})
