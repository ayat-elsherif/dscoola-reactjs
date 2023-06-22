import fetch from '../auth/AuthInterceptor';
const UserProfileServices = {};

 
UserProfileServices.getInstructorProfile = function (id) {
  return fetch({
    url: `api/my/profile/${id}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};


export default UserProfileServices;
