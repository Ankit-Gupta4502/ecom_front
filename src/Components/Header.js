import React from 'react'
import { FiShoppingBag } from "react-icons/fi"
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/ContextProvider'
const Header = () => {
    const { state: { cartItems, auth, isAuthenticated },logout } = useGlobalContext()
    return (
        <div className='container mx-auto xl:px-14 py-5 shadow-md '>
            <div className="top-logo flex justify-between items-center">
                <div className="img-wrapper">
                    <img src={"./images/Logo-lockup.png"} className="w-[160px] h-[32px]" />
                </div>
                <div className="top-nav-links flex items-center justify-between space-x-5">
                    {!isAuthenticated ? <Link to="/login">
                        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                            Login / Register
                        </button>
                    </Link>
                        :
                        <div className="user-wrapper flex items-center space-x-3">
                            <AiOutlineUser />
                            <span>{auth?.name}</span>
                        </div>

                    }
                    {isAuthenticated && <div className="icon-wrapper " onClick={logout} >
                        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                            Logout
                        </button>
                    </div>}
                    <div className="icon-wrapper relative ">
                        <div className="text-center leading-[1] cart-items w-[20px] h-[20px] rounded-full absolute top-[-5px] left-[12px] bg-black text-white">
                            {cartItems?.length}
                        </div>
                        <FiShoppingBag size={22} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header