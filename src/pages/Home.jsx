import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../Context/ContextProvider'
import { useNavigate } from 'react-router'
import axios from 'axios'
const Home = () => {
  const navigate = useNavigate()
  const { state: { isAuthenticated, cartItems }, addCartItems, removeCartItems } = useGlobalContext()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])
  return (
    <>
      <div className='container mx-auto grid grid-cols-[2fr_1fr] xl:px-10  place-items-start mt-10'>
        <div className="product-list  px-10 space-y-5 ">
          {
            loading ?
              <h1 className='text-center'>Loading...</h1> :
              products.map((item) => {
                return <div className="flex font-sans shadow-md rounded-md" key={item.id} >
                  <div className="flex-none w-48 relative">
                    <img src={item?.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </div>
                  <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                      <h1 className="flex-auto text-lg font-semibold text-slate-900">
                        {item?.title}
                      </h1>
                      <div className="text-lg font-semibold text-slate-500">
                        {item?.price} $
                      </div>
                    </div>
                    <div className=" mt-4 mb-6 pb-6 border-b border-slate-200">
                      <p className='text-sm leading-5 text-slate-700 max-w-[400px]'>
                        {item?.description}
                      </p>
                    </div>
                    <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="button" disabled={cartItems.some((it) => it.id === item.id)} onClick={() => !isAuthenticated ? navigate("/login") : addCartItems(item)} >
                      {cartItems.some((it) => it.id === item.id)?"Already in Cart":"Add To Cart"}
                    </button>
                  </form>
                </div>
              })
          }

        </div>

        <div className="shadow-md rounded-md w-full py-3 px-3">
          <h1 className='text-xl mb-5' >Cart Items</h1>
          <div className="product-list  px-10 space-y-5 ">
            {

              cartItems.map((item) => {
                return <div className="flex font-sans items-start" key={item.id} >
                  <div className="flex-none relative">
                    <img src={item?.image} alt="" width={100} height={100} className="object-cover" loading="lazy" />
                  </div>
                  <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                      <h1 className="flex-auto font-semibold text-slate-900">
                        {item?.title}
                      </h1>
                      <div className="text-lg my-3 font-semibold text-slate-500">
                        {item?.price} $
                      </div>
                    </div>
                    <button className="h-10 text-sm px-6 font-semibold rounded-md bg-rose-900 text-white" type="button" onClick={() => removeCartItems(item.id)} >
                      Remove Item
                    </button>
                  </form>
                </div>
              })
            }

          </div>
          <hr className='my-3'/>
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className='text-xl font-semibold' > {cartItems.reduce((acc,item)=>acc+=item?.price,0)} $</span>
            </div>
        </div>

      </div>
    </>
  )
}

export default Home