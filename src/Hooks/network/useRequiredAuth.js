import { useSelector } from 'react-redux';

function useRequiredAuth() {
  const { currentUser } = useSelector((state) => state?.user);

  const requiredAuth = (onSuccess, onError) => {
    if (!!currentUser) {
      console.log('requiredAuth  currentUser', currentUser);

      return onSuccess();
    } else {
      if (onError) {
        return onError();
      }
      return null;
    }
  };
  return { requiredAuth };
}

export default useRequiredAuth;
