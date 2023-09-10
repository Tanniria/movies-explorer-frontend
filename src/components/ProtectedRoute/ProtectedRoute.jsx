import React, {useContext} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({element: Component, ...props}) => {
	const {user} = useContext(CurrentUserContext);
	return user.isAuth ? (
		<Outlet {...props} />
	) : (
		<Navigate
			to='/signin'
			replace
		/>
	);
};
export default ProtectedRoute;
