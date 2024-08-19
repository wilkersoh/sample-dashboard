import { UserStoreProvider } from "@/providers/user/user-store-provider";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        queryFn: async ({ queryKey: [path] }) => {
          try {
            const response = await fetch(`https://reqres.in/api/${path}`);
            if (!response.ok)
              throw new Error(`Http error! status: ${response.status}`);

            const data = await response.json();
            return data;
          } catch (error) {
            throw error;
          }
        },
        staleTime: 1000 * 10 * 2, // 2 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserStoreProvider>
        <Component {...pageProps} />
      </UserStoreProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
