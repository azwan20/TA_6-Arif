import "@/styles/globals.css";
import { UserProvider } from "../../public/user";
import AuthStateChangeProvider from "../../public/auth";

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  <UserProvider>
    <AuthStateChangeProvider >
      <Component {...pageProps} />
    </AuthStateChangeProvider>
  </UserProvider>;
}
