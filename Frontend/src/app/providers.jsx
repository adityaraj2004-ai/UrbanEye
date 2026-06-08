import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./queryClient.js";
import { AuthProvider } from "../context/AuthContext.jsx";
import { SocketProvider } from "../context/SocketContext.jsx";

// -------------------------------------------------------
// WRAPS ENTIRE APP WITH ALL PROVIDERS
// Order matters:
// QueryClientProvider → outermost (needed by everything)
// AuthProvider → manages user state
// SocketProvider → manages socket connection
// -------------------------------------------------------
const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </AuthProvider>
      {/* Only shows in development — remove in production */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;