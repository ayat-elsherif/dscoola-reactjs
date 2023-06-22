import { useLocation } from 'react-router-dom';

export const useQParam = (name) => {
  const location = useLocation();

  if (!name) return null;

  const query = new URLSearchParams(location.search);

  return query.get(name);
};
