import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout';
import Products from './component/Products/Products';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Brands from './component/Brands/Brands';
import Carts from './component/Carts/Carts';
import Notfound from './component/notfound/notfound';
import UserContextProvider from './context/userContext'; 
import ProtectedRoute from './component/protectedRoute/protectedRoute';
import Productdetails from './component/productdetails/productdetails';
import { CartContextProvider } from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Checkout from './component/checkout/checkout';
import Allorders from './component/allorders/allorders';
import { Offline, Online } from 'react-detect-offline';

let query = new QueryClient()


let routes=createBrowserRouter([
{path:'',element:<Layout/>,children:[
{index:true,element:<ProtectedRoute><Products/></ProtectedRoute>},
{path:'login',element:<Login/>},
{path:'Register',element:<Register/>},
{path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
{path:'ProductDetails/:id/:category',element:<ProtectedRoute><Productdetails/></ProtectedRoute>},
{path:'cart',element:<ProtectedRoute><Carts/></ProtectedRoute>},
{path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
{path:'checkout/:cartId',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
{path:'*',element:<Notfound/>},
]}
])


function App() { 
  return (
    <CartContextProvider>
       <UserContextProvider>
        <QueryClientProvider client={query}>
          <ReactQueryDevtools/>
        <RouterProvider router={routes}></RouterProvider>
    <Offline>
<div className='bg-yellow-200 fixed bottom-4 star-4 rounded-md'>
Only shown offline (surprise!)
</div>


    </Offline>
        <Toaster/>
        </QueryClientProvider>
    </UserContextProvider>
    </CartContextProvider>
   
  )
}

export default App
