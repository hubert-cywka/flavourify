import { QueryClient } from '@tanstack/react-query';

const TestsQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      keepPreviousData: false,
      staleTime: 1,
      cacheTime: 1
    },
    mutations: {
      retry: false
    }
  }
});

export default TestsQueryClient;
