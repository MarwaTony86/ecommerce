import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../loader/loader'
import { Link } from 'react-router-dom'
import CategorySlider from './../categorySlider/categorySlider'
import  {cartContext}  from '../../context/cartContext'
import toast from 'react-hot-toast'
import MainSlider from '../mainSlider/mainSlider'
import { useQuery } from '@tanstack/react-query'


export default function Products() {

let {data,error,isError,isLoading,isFetching}=useQuery({querykey:['recentproduct'],
  queryFn:getproducts,
  refetchInterval:5000,
  slateTime:4000,
  select:(data)=>{
  return data?.data

  }
})
//console.log(data?.data);

let {addProductToCart} = useContext(cartContext)
 // const [product,setProduct] = useState([])
  //const [isLoading, setLoading] = useState(true)

async function addProductItem(id){
  let response = await addProductToCart(id) 
  
  if (response.data.status == 'success'){
    toast.success(response.data.message);
  } else{
    toast.error(response.data.message);
  }
}

 async function getproducts(){
 
 return axios.get('https://ecommerce.routemisr.com/api/v1/products')
.then(({data})=>{
 return data
 
 
 
  // setProduct(data.data)
})
  }
  // useEffect(()=>{
  // getproducts() 

  // },[])
 
  if(isLoading){
    return (
      <Loader/>
    ) 

  }else{
    return (
      <div className='container px-4'>
        <MainSlider/>
      <CategorySlider/>
     <h1 className='text-3xl font-medium'>All Products</h1>
  
       <div className='container py-5'>
        
        
          <div className="row gap-1">
      {data.map((productInfo)=>{
  return <div className='w-2/12 px-4 my-2 product ' key={productInfo.id}>
    <div className='bg-slate-200 p-5'>
    <Link to={`/productDetails/${productInfo.id}/${productInfo.category.name}`}>
  <img className='w-full' src={productInfo.imageCover} alt ={productInfo.title}/>
  <span className=' block text-xl font-light text-green-600'>
  {productInfo.category.name}
  </span>
  <span className='text-lg font-semibold text-gray-700'>
  {productInfo.title.split(' ').slice(0,3).join(' ')}
  </span>
  <div className='flex justify-between my-3'>
  <span>{productInfo.price}EGP</span>
  <span>{productInfo.ratingsQuantity} <i className='fas fa-star text-yellow-500'></i></span>
  </div>
  </Link>
  <button onClick={()=>{addProductItem(productInfo.id)}} className='btn '>Add To cart</button>
    </div>
  
  
  </div>
  
  
      })}
      </div> 
      
      </div>
      
      </div>
     
       
    )
  }

  
}
               