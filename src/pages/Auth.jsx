import React, { useState } from 'react'
import { useGlobalContext } from '../Context/ContextProvider'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';

const Auth = ({ type = "login" }) => {
    const [formVals, setFormVals] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const { register, state: { errors, isAuthenticated, auth, loading }, login } = useGlobalContext()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])


    return (
        <>
            <div className="auth-form w-full h-screen flex items-center justify-center">
                <div className="form-container max-w-[400px] w-full shadow-xl rounded-xl p-10 mx-auto">
                    <h1 className='text-3xl capitalize font-semibold text-center' >{type}</h1>

                    <div className=" space-y-2">
                        {type === "register" && <div className="form-group">
                            <label className='mb-2 block' >Name</label>
                            <input type="text" className='appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-black dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-offset-black' placeholder='Enter Your Name' value={formVals?.name} name="name" onChange={(({ target }) => setFormVals({ ...formVals, [target.name]: target.value }))} />
                            <span className="block text-red-600">
                                {errors?.name}
                            </span>
                        </div>}
                        <div className="form-group">
                            <label className='mb-2 block' >Email</label>
                            <input type="email" className='appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-black dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-offset-black' placeholder='Enter Your Email' value={formVals?.email} name="email" onChange={(({ target }) => setFormVals({ ...formVals, [target.name]: target.value }))} />

                            <span className='block text-red-600' >
                                {errors?.email}
                            </span>
                        </div>
                        <div className="form-group">
                            <label className='mb-2 block' >Password</label>
                            <input type="password" className='appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-black dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-offset-black' placeholder='Enter Your Password' value={formVals?.password} name="password" onChange={(({ target }) => setFormVals({ ...formVals, [target.name]: target.value }))} />
                            <span className='block text-red-600' >
                                {errors?.password}
                            </span>
                        </div>

                        {type === "register" && <div className="form-group ">
                            <label className='mb-2 block' >Confirm Password</label>
                            <input type="password" className='appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-black dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-offset-black' placeholder='Confirm Your Password' value={formVals?.password_confirmation} name="password_confirmation" onChange={(({ target }) => setFormVals({ ...formVals, [target.name]: target.value }))} />
                            <span className='block text-red-600' >
                                {errors?.password_confirmation}
                            </span>

                        </div>}

                    </div>
                    <button className="h-10 mt-4 w-full px-6 font-semibold rounded-md bg-black text-white capitalize" onClick={() => type === "register" ? register(formVals) : login({ email: formVals?.email, password: formVals?.password })} disabled={loading} >
                        {type}
                    </button>

                    <Link className='text-xs text-slate-500 underline mt-3'
                        to={
                            `/${type === "login" ? "register" : "login"}`}>
                        Don't have an account {type === "register" ? "login" : "register"} ?
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Auth