import React from 'react'

const AuthContext = React.createContext()

const authState = {
	isLoading: true,
	isSignout: false,
	userToken: null,
}

const authReducer = (prevState, action) => {
	switch (action.type) {
		case 'RESTORE_TOKEN':
			return {
				...prevState,
				userToken: action.token,
				isLoading: false,
			}
		case 'SIGN_IN':
			return {
				...prevState,
				isSignout: false,
				userToken: action.token,
			}
		case 'SIGN_OUT':
			return {
				...prevState,
				isSignout: true,
				userToken: null,
			}
	}
}

export { AuthContext, authState, authReducer }
