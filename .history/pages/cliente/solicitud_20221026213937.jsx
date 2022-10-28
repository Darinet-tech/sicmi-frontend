import { useFetchUser } from "../../lib/authContext";
import Select from "react-select";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { Authentication, Layout } from "../../components";
import LayoutCliente from "../../components/LayoutCliente";

export default function solicitud({ solicitud }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  return (
    <Layout user={user} titulo="Cliente" baseURL="./../">
      <LayoutCliente>
        {!loading &&
          (user ? (
            <div style={{ margin: "auto", width: "100%" }}>
              <Select
                defaultValue={{ label: "Unidad Organizativa" }}
                options={unidadOrganizativa}
                onChange={handleSelectChange}
                className={styles.select}
              />
              <Spacer></Spacer>
              <Select
                defaultValue={{ label: "Nombre del Inmueble" }}
                options={nombreInmueble}
                onChange={handleSelectChange}
                className={styles.select}
              />
              <Spacer></Spacer>
              <Select
                defaultValue={{ label: "Área solicitante" }}
                options={areaSolicitante}
                onChange={handleSelectChange}
                styles={{ width: "400px", color: "black" }}
              />
              <Spacer></Spacer>
              <Select
                defaultValue={{ label: "Centro de Costo" }}
                options={centroCosto}
                onChange={handleSelectChange}
                styles={{ width: "400px", color: "black" }}
              />
              <Spacer></Spacer>
              <Select
                defaultValue={{ label: "Local donde ocurre la incidencia" }}
                options={localIncidencia}
                onChange={handleSelectChange}
                styles={{ width: "400px", color: "black" }}
              />
              <Grid.Container gap={2.5} css={{ mt: "4px", padding: "0" }}>
                <Grid>
                  <Textarea
                    bordered
                    color="white"
                    status="white"
                    helperColor="white"
                    helperText="*Opcional"
                    label="Descripción de las afectaciones"
                    placeholder="Introduzca una breve descripción de la deficiencia o afectación"
                    width="400px"
                  />
                </Grid>
              </Grid.Container>
            </div>
          ) : (
            <main>
              <Authentication />
            </main>
          ))}
      </LayoutCliente>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const inmueblesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?pagination[page]=1&pagination[pageSize]=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return {
    props: {
      inmuebles: inmueblesResponse,
    },
  };
}
