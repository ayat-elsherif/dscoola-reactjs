import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MyWishlistServices from '../../../../services/MyWishlistServices';

const fetchMyWishList = (pagination, search) => {
  return MyWishlistServices.getList(pagination, search);
};

const addToMyWishlist = (data) => {
  return MyWishlistServices.addToMyWishlist(data);
};
const removeFromMyWishlist = (id) => {
  return MyWishlistServices.addRemoveFromMyWishlist(id);
};

export const useGetMyWishList = (pagination, search) => {
  return useQuery(
    [`my-wishlist`, pagination, search],
    () => fetchMyWishList(pagination, search),
    {
      keepPreviousData: true,
    }
  );
};


export const useAddToMyWishlist = (onSuccess, onError) => {
 
  return useMutation(addToMyWishlist, {
    onSuccess,
    onError,
  });
};
export const useRemoveFromMyWishlist = (onSuccess, onError) => {
  
  return useMutation(removeFromMyWishlist, {
    onSuccess,
    onError,
  });
};
