import "@/src/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/libs/theme";
import { UserProvider } from "@/libs/providers/UserContext";
import Loader from "@/components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Loader />
          <Component {...pageProps} />
        </UserProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
