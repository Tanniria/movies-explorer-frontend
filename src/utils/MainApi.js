import {BASE_URL, responseConstructor} from '../utils/apiUtils';

export const register = (name, email, password) => responseConstructor(`${BASE_URL}/signup`, 'POST', JSON.stringify({name, email, password}), false);
export const login = (email, password) => responseConstructor(`${BASE_URL}/signin`, 'POST', JSON.stringify({email, password}), false);
export const getUser = () => responseConstructor(`${BASE_URL}/users/me`, 'GET', null, true);
export const editUser = (data) => responseConstructor(`${BASE_URL}/users/me`, 'PATCH', JSON.stringify(data), true);
