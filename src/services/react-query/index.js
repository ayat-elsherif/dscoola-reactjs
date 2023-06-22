import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import QueryLoading from './QueryLoading';

function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <QueryLoading />
      {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default QueryProvider;
