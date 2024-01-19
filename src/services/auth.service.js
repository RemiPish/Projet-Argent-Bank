/* eslint-disable import/no-anonymous-default-export */
// src/actions/authActions.js

import axios from 'axios';

export const API_URL = 'http://localhost:3001/api/v1/user'

//endpoint /login pour l'authentification
const login = async (user) => {
  const request = await axios.post(API_URL + "/login", { email: user.email, password: user.password });
  const response = await request.data;
  
  if (user.rememberMe) {
    localStorage.setItem("authUser", JSON.stringify(response));
  } else {
    sessionStorage.setItem("authUser", JSON.stringify(response));
  }
//recupere les données de l'utilisateur quand le login a reussi
  try {
    const profileResponse = await profile(response.body.token);
    if (user.rememberMe) {
      localStorage.setItem("userDetails", JSON.stringify(profileResponse));
    } else {
      sessionStorage.setItem("userDetails", JSON.stringify(profileResponse));
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }

  return response;
};

const getStoredAuthUser = () => {
  const authUserLocalStorage = localStorage.getItem("authUser");
  const authUserSessionStorage = sessionStorage.getItem("authUser");

  if (authUserLocalStorage) {
    return JSON.parse(authUserLocalStorage);
  } else if (authUserSessionStorage) {
    return JSON.parse(authUserSessionStorage);
  }

  return null;
};

//recup le donnée mock de profile
const fetchAccounts = async () => {
  try {
    const response = await axios.get("./mock/mockData.json");
    return response.data.accounts;
  } catch (error) {
    console.error('Error fetching account data:', error);
    throw error;
  }
};

// endpoint /profile pour recuperer les données de l'utilisateur
const profile = (token) => {
  return axios({
    method: "POST",
    url: API_URL + "/profile",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return response.data.body;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// gere le sign out
const logout = () => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("userDetails");
  sessionStorage.removeItem("authUser");
  sessionStorage.removeItem("userDetails");
};

//endpoing /profile pour recuperer les données de l'utilisateur
const updateProfile = (token, firstName, lastName) => {
  return axios({
    method: "PUT",
    url: API_URL + "/profile",
    data: {
      firstName: firstName.toString(),
      lastName: lastName.toString(),
    },
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export default {
  login,
  profile,
  fetchAccounts,
  getStoredAuthUser,
  logout,
  updateProfile
};
