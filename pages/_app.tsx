import "../styles/styles.css";
// this style is for side bar, sidebar will exist every where so put it in global scope
import "react-pro-sidebar/dist/scss/styles.scss";
// this style will hold all global styles
import "../styles/app.scss";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import ChakraTheme from "../chakra.theme";

import { ChakraProvider } from "@chakra-ui/react";

import { SessionProvider } from "next-auth/react";

import React from "react";

type PropType = {
  Component: any;
  pageProps: any;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: PropType) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ChakraProvider theme={ChakraTheme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session} refetchInterval={5 * 60}>
            <Component {...pageProps} />
            {/*} <ReactQueryDevtools initialIsOpen={false} /> {*/}
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
