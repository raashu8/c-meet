import "@/styles/globals.css";
import { Provider } from "react-redux";
import "@/styles/responsive.css";
import { SessionProvider } from "next-auth/react";
import store from "@/redux/store";
import Head from "next/head";
import Script from "next/script";
import LoaderState from "@/components/Loader";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";



export default function App({ Component, pageProps, session }) {
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);


  return (
    <>
      {isLoading ? <LoaderState /> : ""}
      <ToastContainer />
      <Provider store={store}>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
        
        </Head>
        <Script
          id="bootstrap-cdn"
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        />
        <Script src="https://code.jquery.com/jquery-3.5.1.min.js" />
        <Script src="https://meet.jit.si/libs/lib-jitsi-meet.min.js" />
        <Script src="https://meet-jitsi.colan.in/external_api.js" />

        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>


        {/* <SessionProvider session={session}>
           <Layout > 
            <Component pageProps={pageProps} />
          </Layout> 
        </SessionProvider>  */}


      </Provider>
    </>
  );
}
