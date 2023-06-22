import fetch from '../auth/AuthInterceptor';

const CartService = {};

CartService.getCartList = function () {
  return fetch({
    url: 'api/cart',
    method: 'get',
    headers: {
      'public-request': 'true',
    },
     
  });
};
CartService.addToCartList = function (data) {
    return fetch({
      url: 'api/cart',
      method: 'post',
      headers: {
        'public-request': 'true',
      },
      data:data,
         
       
       
    });
  };
  CartService.deleteCartList = function (id,type) {
    return fetch({
      url: `api/cart/delete&item_id=${id}&item_type=${type}`,
      method: 'delete',
      headers: {
        'public-request': 'true',
      },
      
       
    });
  };
  CartService.enrollNow = function (data) {
    return fetch({
      url: 'api/my/free-enrolled',
      method: 'post',
      headers: {
        'public-request': 'true',
      },
      data:data,
         
       
       
    });
  };
 
 
 

export default CartService;