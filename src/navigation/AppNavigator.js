import React, { useReducer, useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'

import { AuthContext, authReducer, authState } from '../context/AuthContext'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Yoga from '../screens/Yoga'
import Foods from '../screens/Foods'
import Calculator from '../screens/Calculator'
import TabNavigator from '../navigation/TabNavigator'
import EditProfile from '../screens/EditProfile'
import Category from '../screens/Category'
import Details from '../screens/Details'

const Stack = createStackNavigator()

const AppNavigator = () => {
	const [state, dispatch] = useReducer(authReducer, authState)

	useEffect(() => {
		checkAuthStatus()
	}, [])

	const checkAuthStatus = async () => {
		let userToken
		try {
			userToken = await AsyncStorage.getItem('TOKEN')
		} catch (e) {
			console.log(e)
		}
		dispatch({ type: 'RESTORE_TOKEN', token: userToken })
	}

	const authContext = useMemo(
		() => ({
			signIn: async data => {
				dispatch({ type: 'SIGN_IN', token: data.token })
			},
			signOut: () => dispatch({ type: 'SIGN_OUT' }),
			signUp: async data => {
				dispatch({ type: 'SIGN_IN', token: data.token })
			},
		}),
		[],
	)

	if (state.isLoading) {
		return null
	}

	return (
		<NavigationContainer>
			<AuthContext.Provider value={authContext}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						...TransitionPresets.SlideFromRightIOS,
					}}>
					{state.userToken == null ? (
						<>
							<Stack.Screen name="Login" component={Login} />
							<Stack.Screen name="Signup" component={Signup} />
						</>
					) : (
						<>
							<Stack.Screen name="Tabs" component={TabNavigator} />
							<Stack.Screen name="Yoga" component={Yoga} />
							<Stack.Screen name="Foods" component={Foods} />
							<Stack.Screen name="Calculator" component={Calculator} />
							<Stack.Screen name="Edit" component={EditProfile} />
							<Stack.Screen name="Category" component={Category} />
							<Stack.Screen name="Details" component={Details} />
						</>
					)}
				</Stack.Navigator>
			</AuthContext.Provider>
		</NavigationContainer>
	)
}

export { AppNavigator as default, AuthContext }
