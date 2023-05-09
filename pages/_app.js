import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();

export default function App({Component, pageProps}) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
