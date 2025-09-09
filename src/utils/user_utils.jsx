import {JWT_TOKEN_KEY} from "../config.js";
import {jwtDecode} from 'jwt-decode';


export const userLoggedIn = () => {
  const token =   localStorage.getItem(JWT_TOKEN_KEY);
  return !!token;
}

export const getUserFromToken = () => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log("Decoded: ", decoded);
        return decoded;
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
}

export const clearAuth = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
}