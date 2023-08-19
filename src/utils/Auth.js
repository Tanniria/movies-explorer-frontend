const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };
  
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  
  export const register = ({ name, email, password }) => {
    console.log(name, email, password);
    return fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => checkResponse(res));
  };
  
  export const login = ({ email, password }) => {
    return fetch(`http://localhost:3000/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => checkResponse(res));
  };
  
  export const checkToken = (token) => {
    return fetch(`http://localhost:3000/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => checkResponse(res));
  };
  
  export const getUserInfo = () => {
    const token = localStorage.getItem('jwt');
    return fetch(`http://localhost:3000/users/me`, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => checkResponse(res));
  };