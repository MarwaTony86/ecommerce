import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';


export default function Brands() {

  let {data,error,isError,isLoading, isFetching}=useQuery({querykey:['recentproduct'],
    queryFn:getproducts,
    refetchInterval:5000,
    slateTime:4000
  
     
  }) 
  console.log(data?.data);


  
  function getproducts(){
 
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then(({data})=>{
      return data
     
      // setProduct(data.data)
    })
      }
  return (
    <div>
    Brands
    </div>
  )
}
