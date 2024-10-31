import type { AppProps } from "next/app";
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { NextPageWithLayout } from "@/types";
import PrivateRoute from "@/utils/private-route";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import React, { useState } from "react";
import DefaultSeo from "@/components/ui/default-seo";
import { ModalProvider } from "@/components/ui/modal/modal.context";
import ManagedModal from "@/components/ui/modal/managed-modal";
import { UIProvider } from "@/contexts/ui.context";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/contexts/me.context";

const Noop: React.FC<{children?: React.ReactNode}> = ({ children }) => (
  <>{children}</>
);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;
  const [queryClient] = useState(()=> new QueryClient());

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <UserProvider>
            <UIProvider>
              <ModalProvider>
                <DefaultSeo/>
                { authProps ? (
                  <PrivateRoute authProps={authProps}>
                    <Layout {...pageProps}>
                      <Component {...pageProps} />
                    </Layout>
                  </PrivateRoute>
                ) : (
                  <Layout {...pageProps}>
                    <Component {...pageProps} />
                  </Layout>
                )}
                <ToastContainer autoClose={2000} theme="colored"/>
                <ManagedModal />
              </ModalProvider>
            </UIProvider>
          </UserProvider>
        </Hydrate>
      </QueryClientProvider>
    </React.StrictMode> 
  )
}

export default CustomApp;
