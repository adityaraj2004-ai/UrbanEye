import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch when user switches browser tabs
      refetchOnWindowFocus: false,
      // Retry failed requests once before showing error
      retry: 1,
      // Data stays fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default queryClient;