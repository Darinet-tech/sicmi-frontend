import "../styles/globals.css";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "../themes/darktheme";
import axios from "axios";
import { UIProvider } from "../components/context";

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <UIProvider>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </UIProvider>
  );
}

export default MyApp;
