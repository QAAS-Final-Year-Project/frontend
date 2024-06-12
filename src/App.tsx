import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import routes from "./routes";
import NotificationProvider from "Shared/layout/notifications";
import useCookies from "Shared/hooks/cookies";

function App() {
  const [token] = useCookies("token");
  const [user] = useCookies("user");
  const parsedUser = user ? JSON.parse(user) : null;
  console.log(parsedUser)

  const router = createBrowserRouter(routes(!!token, parsedUser?.accountType,parsedUser ));
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 30,
        refetchOnMount: false,
        refetchOnReconnect: true,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <RouterProvider router={router} />;
      </NotificationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
