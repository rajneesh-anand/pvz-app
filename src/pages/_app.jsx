import "react-toastify/dist/ReactToastify.css";
import "@assets/css/tailwind.css";
import "@assets/css/custom.css";
import "@assets/css/elegant-font-icons.css";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/modal/managed-modal";
import React, { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import * as gtag from "@utils/ga";
import { ToastContainer } from "react-toastify";
import { ManagedUserContext } from "@contexts/user.context";

const Noop = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }) => {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const Layout = Component.Layout || Noop;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <ManagedUserContext>
            <ManagedUIContext>
              <>
                <Layout pageProps={pageProps}>
                  <Component {...pageProps} key={router.route} />
                </Layout>

                <ToastContainer />
                <ManagedModal />
              </>
            </ManagedUIContext>
          </ManagedUserContext>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default CustomApp;
