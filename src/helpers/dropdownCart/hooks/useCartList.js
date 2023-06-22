import { useMutation, useQuery } from "@tanstack/react-query";
import CartService from "../../../services/CartSrevices";

const getCartList = () => {
    return CartService.getCartList();
};
const addToCartList = (data) => {
    return CartService.addToCartList(data);
};
const deleteFromCheckout = (id,type) => {
    return CartService.deleteCartList(id,type);
};
const enrollNow = (data) => {
    return CartService.enrollNow(data);
};

export const useCartList = (onSuccess = (res) => res) => {
    return useQuery([`cart-list`], () => getCartList(), {
        onSuccess: onSuccess,
    });
};

export const useAddToCartList = (onSuccess, onError) => {
    return useMutation(addToCartList, {
        onSuccess,
        onError,
    });
};
export const useRemoveFromCheckout = (onSuccess, onError) => {
    return useMutation(deleteFromCheckout, {
        onSuccess,
        onError,
    });
};

export const useEnroll = (onSuccess, onError) => {
    return useMutation(enrollNow, {
        onSuccess,
        onError,
    });
};
