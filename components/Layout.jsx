import Head from "next/head";
import { Menu } from "./Menu";
import { Navbar } from "./Navbar";
import { UserProvider } from "../lib/authContext";
import { Authentication } from "./Authentication";

export const Layout = ({
  user,
  loading = false,
  children,
  titulo,
  mostrar,
}) => {
  return (
    <UserProvider value={{ user, loading }}>
      <Head>
        <title>SiGMCI - {titulo}</title>
        <meta name="autor" content="Darinet" />
      </Head>
      <Navbar></Navbar>
      {!loading &&
        (user ? (
          <>
            <Menu mostrar={mostrar}></Menu>
            <main>{children}</main>
          </>
        ) : (
          <main><Authentication /></main>
        ))}
    </UserProvider>
  );
};
