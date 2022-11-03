import Head from "next/head";

import { Navbar } from "./Navbar";
import { UserProvider } from "../lib/authContext";
import { Authentication } from "./Authentication";

export const Layout = ({
  user,
  loading = false,
  children,
  baseURL = './',
  titulo
}) => {
  return (
    <UserProvider value={{ user, loading }}>
      <Head>
        <title>SiGMCI - {titulo}</title>
        <meta name="autor" content="Darinet" />
      </Head>
      <Navbar baseURL={baseURL}></Navbar>
      {!loading &&
        (user ? (
          <>            
            
          </>
        ) : (
          <main><Authentication /></main>
        ))}
    </UserProvider>
  );
};
