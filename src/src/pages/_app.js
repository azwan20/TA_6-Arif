import "@/styles/globals.css";
import { UserProvider } from "../../public/user";
import AuthStateChangeProvider from "../../public/auth";
function App({ Component, pageProps }) {

  return (
    <UserProvider>
      <AuthStateChangeProvider>
        <Component {...pageProps} />
      </AuthStateChangeProvider>
    </UserProvider>

  );
}

export default App