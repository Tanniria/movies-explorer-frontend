import React from 'react';

export const CurrentUserContext = React.createContext({
	isAuth: false,
	currentUser: {},
	isEditedUserInfo: '',
	isTokenChecked: false,
	setUser: () => {},
});
