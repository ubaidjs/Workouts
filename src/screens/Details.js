import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../components/Header'
import global from '../constant/styles'
import colors from '../constant/colors'

const Details = ({ route }) => {
	const { yoga } = route.params
	return (
		<View style={global.container}>
			<Header title={yoga.name} />
			<ScrollView>
				<View style={styles.main}>
					<View style={styles.imageWrapper}>
						<Image style={styles.image} source={{ uri: yoga.image }} />
					</View>
					<TouchableOpacity>
						<View style={styles.videoButton}>
							<AntDesign name="playcircleo" size={15} color="white" />
							<Text style={styles.videoText}>Video</Text>
						</View>
					</TouchableOpacity>
					<View style={styles.info}>
						<Text style={styles.heading}>Details</Text>
						<Text style={styles.para}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
							corporis ex eos eum placeat expedita blanditiis amet nesciunt sed
							quos natus minus culpa incidunt quidem accusamus dolores minima
							optio mollitia.
						</Text>
						<Text style={styles.para}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
							alias repellendus totam eos ipsam a facilis, minus quod mollitia
							ipsum facere dolore maiores modi, eum maxime rerum doloribus.
							Sequi, ratione!
						</Text>
					</View>
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
		paddingVertical: 10,
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
		fontWeight: 'bold',
		color: colors.lightBlack,
	},
	para: {
		fontSize: 16,
		marginVertical: 10,
	},
})
