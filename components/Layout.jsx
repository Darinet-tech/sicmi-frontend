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
        {/* Agregamos el div con la imagen de fondo */}
      <div
        style={{
          content: "",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/personal-de-mantenimiento.png')", // Ruta a tu imagen
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh", // Asegura que cubra toda la altura de la vista
          zIndex: -1, // Coloca el fondo detrás de todo
        
        }}
      ></div>
    </UserProvider>
  );
};
