import Head from "next/head";

import { Navbar } from "./Navbar";
import { UserProvider } from "../lib/authContext";
import { Authentication } from "./Authentication";
import { Grid } from "@nextui-org/react";

export const Layout = ({
  user,
  loading = false,
  children,
  baseURL = "./",
  titulo,
}) => {
  return (
    <UserProvider value={{ user, loading }}>
      <Head>
        <title>SiCMI - {titulo}</title>
        <meta name="autor" content="Darinet" />
      </Head>
      <Navbar baseURL={baseURL}></Navbar>
      {!loading &&
        (user ? (
          <>
            <main>{children}</main>
          </>
        ) : (
          <main>
            <Grid.Container gap={2} light="true">
              <Grid xl={12}>
                <main>
                  <Authentication />
                </main>
              </Grid>
            </Grid.Container>
          </main>
        ))}
    </UserProvider>
  );
};
