import axios from 'axios';
import { useFormik} from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('enter availd email'),
  });


  async function sendCode(values){
  let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
  
  if(data.statusMsg == 'success'){
  document.querySelector('.forgotPassword').classList.add('d-none')
  document.querySelector('.verfiyCode').classList.remove('d-none')

  }
  }
  let formik=useFormik({
    initialValues:{
      email:''
    },
    validationSchema:validationSchema
    ,
    onSubmit:sendCode
  })
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required('email is required'),
  });

  let navigate=useNavigate()
  async function sendData(values){
  let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
  console.log(data);
  if (data.status=='Success'){
    navigate('/resetPassword')

  }
  // if(data.statusMsg == 'success'){


  // }
  }
  let verfiyFormik=useFormik({
    initialValues:{
      resetCode:''
    },
    validationSchema:validationSchema2
    ,
    onSubmit:sendData
  })
  return (
    <>
      <div className='forgotpassword'>
      <h3 className='mx-10 '>ForgotPassword :</h3>
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>
        <label className='mx-20 my-5'>email:</label>
       <input onBlur={formik.handleBlur} type="email" id="email" value={formik.values.email} onChange={formik.handleChange} className="bg-gray-50 border mx-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        <br/>
    {formik.touched.email && formik.errors.email ? <p className='text-danger my-3'>{formik.errors.email}</p>:''}
        <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className='btn bg-main text-light mx-20 '>send Code</button>
      </form>
    </div>
      <div className='verfiyCode d-none'>
      <h3 className='mx-10'> verfiyCode :</h3>
             <form onSubmit={verfiyFormik.handleSubmit} className='w-75 mx-auto my-5'>
        <label className='mx-20 my-5'>resetCode:</label>
       <input onBlur={verfiyFormik.handleBlur} type="text" id="resetCode" value={verfiyFormik.values.resetCode} onChange={verfiyFormik.handleChange} className="bg-gray-50 border mx-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        <br/>
    {verfiyFormik.touched.resetCode && verfiyFormik.errors.resetCode ? <p className='text-danger my-3'>{verfiyFormik.errors.resetCode}</p>:''}
        <button disabled={!(verfiyFormik.isValid&&verfiyFormik.dirty)} type="submit" className='btn bg-main text-light mx-20 '>send Code</button>
      </form>
    </div>
    </>
  
  )
}  