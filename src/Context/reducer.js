import { toast } from "react-toastify"

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER_PENDING":
    case "LOGIN_USER_PENDING":
      return {
        ...state,
        loading: true
      }

    case "RESET_ERROR":
      return { ...state, errors: {} }
    case "REGISTER_USER_SUCCESS":
    case "LOGIN_USER_SUCCESS":
      localStorage.setItem("ecom_user", JSON.stringify(action.payload))
      return {
        ...state,
        loading: false,
        auth: action.payload,
        isAuthenticated: true
      }

    case "REGISTER_USER_SUCCESS":
    case "LOGIN_USER_SUCCESS":
      localStorage.setItem("ecom_user", JSON.stringify(action.payload))
      return {
        ...state,
        loading: false,
        auth: action.payload,
        isAuthenticated: true
      }

    case "REGISTER_USER_FAILED":
    case "LOGIN_USER_FAILED":
      toast.error(action.payload.message)
      return {
        ...state,
        errors: action.payload?.errors,
        loading: false,

      }

    case "LOGOUT_USER":
      return { ...state, cartItems: [], auth: {}, isAuthenticated: false }

    case "ADD_CART_ITEM":
      return { ...state, cartItems: [...state.cartItems, action.payload] }

    case "REMOVE_CART_ITEM":
      console.log(action.payload);
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) }

    default:
      return { ...state }
  }
}

export default reducer