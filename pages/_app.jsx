import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "../themes/darktheme";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
