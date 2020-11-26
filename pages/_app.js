import styled from "styled-components";
import { GlobalThemeProvider } from "../theme";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "../contexts/Auth";
import "../theme/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <GlobalThemeProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Container>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </GlobalThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 10vh minmax(80vh, auto) 10vh;
`;
