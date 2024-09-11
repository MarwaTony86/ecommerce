import axios from 'axios';
import { createContext } from 'react';
import { toast } from 'react-hot-toast';


export const wishlistContext = createContext(null);

export default function WishlistContextProvider(props) {
  const headers = {
    token: localStorage.getItem('authToken'),
  };
  const URL = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  function addToWishlist(id) {
    const data = {
      productId: id,
    };

    const config = {
      method: 'post',
      url: URL,
      headers: headers,
      data: data,
    };
    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Adding product to wishlist...',
        success: 'Product added successfully!',
        error: 'Error adding product',
      }
    );
  }

  function deleteWishlistItem(id) {
    const config = {
      method: 'delete',
      url: `${URL}/${id}`,
      headers: headers,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Removing product from wishlist...',
        success: 'Product removed successfully!',
        error: 'Error removing product',
      }
    );
  }

  async function getWishlist() {
    let config = {
      method: 'get',
      url: URL,
      headers: headers,
    };

    try {
          const response = await axios(config);
          return response.data.data;
      } catch (error) {
          throw error;
      }
  }

  return (
    <wishlistContext.Provider
      value={{ addToWishlist, getWishlist, deleteWishlistItem }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
