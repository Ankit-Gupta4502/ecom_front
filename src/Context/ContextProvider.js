import React, { useEffect, useState, useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from "axios"
import { ToastContainer } from 'react-toastify'
const Context = React.createContext(null)
const getuser = localStorage.getItem('ecom_user')
const initialState = {
    auth: getuser ? JSON.parse(getuser) : {},
    isAuthenticated: getuser ? true : false,
    products: [],
    cartItems: [],
    loading: false,
    errors: {}
}
const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const logout=()=>{
        localStorage.removeItem('ecom_user')
        dispatch({ type: "LOGOUT_USER" })
    }
    const resetError = () =>{
        dispatch({ type: "RESET_ERROR"})
    }
    const register = async (data) => {
        dispatch({ type: "REGISTER_USER_PENDING", payload: true })
        try {
            const response = await axios.post(`https://ecomauth.onrender.com/register`, data,
            )
            dispatch({ type: "REGISTER_USER_SUCCESS", payload: response.data.user })
        } catch (error) {
            dispatch({ type: "REGISTER_USER_FAILED", payload: error.response?.data||error.response.message  })
        }



    }

    const login = async (data) => {
        dispatch({ type: "LOGIN_USER_PENDING", payload: true })
        try {
            const response = await axios.post(`https://ecomauth.onrender.com/login`, data)
            dispatch({ type: "LOGIN_USER_SUCCESS", payload: response.data?.user })
        } catch (error) {
            dispatch({ type: "LOGIN_USER_FAILED", payload: error.response?.data || error.response.message })
        }
    }

    const addCartItems = (item) => {
        dispatch({ type: "ADD_CART_ITEM", payload: item })
    }

    const removeCartItems = (id) => {
        dispatch({ type: "REMOVE_CART_ITEM", payload: id })
    }

    return (

            <Context.Provider value={{ state, logout,register, login, addCartItems, removeCartItems,resetError }}>
                {children}
                <ToastContainer/>
            </Context.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(Context)
}

export default ContextProvider