import Head from "next/head";

import { Navbar } from "./Navbar";
import { UserProvider } from "../lib/authContext";
import { Authentication } from "./Authentication";
import { Gr}
import MenuAdmin from "./MenuAdmin";

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
            <Grid.Container gap={2} light="true">
      <Grid xl={3}>
        <MenuAdmin></MenuAdmin>
      </Grid>
      <Grid xl={9}>
        <main>{children}</main>
      </Grid>
    </Grid.Container>
          </>
        ) : (
          <main><Authentication /></main>
        ))}
    </UserProvider>
  );
};
