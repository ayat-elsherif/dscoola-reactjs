import fetch from '../auth/AuthInterceptor';
const MyWishlistServices = {};

MyWishlistServices.getList = function (pagination, search) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`q=${search}`);

  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue
        )
      : ``;
  return fetch({
    url: `api/my/courses/wishlist?count=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

MyWishlistServices.addToMyWishlist = function (id) {
  return fetch({
    url: `api/my/courses/wishlist`,
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: {
      course_id: id,
    },
  });
};
MyWishlistServices.addRemoveFromMyWishlist = function (id) {
  return fetch({
    url: `api/my/courses/wishlist/${id}`,
    method: 'delete',
    headers: {
      'public-request': 'true',
    },
  });
};

export default MyWishlistServices;
