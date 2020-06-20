import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

import Home from '../screens/Home'
import List from '../screens/List'
import Profile from '../screens/Profile'
import colors from '../constant/colors'

const Tabs = createBottomTabNavigator()

const TabNavigator = () => {
	return (
		<Tabs.Navigator
			tabBarOptions={{
				activeTintColor: colors.themeColor,
				inactiveTintColor: 'gray',
				showLabel: false,
				style: {
					height: 60,
				},
			}}>
			<Tabs.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<AntDesign name="home" size={25} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="List"
				component={List}
				options={{
					tabBarIcon: ({ color }) => (
						<Feather name="list" size={25} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<AntDesign name="user" size={25} color={color} />
					),
				}}
			/>
		</Tabs.Navigator>
	)
}

export default TabNavigator
