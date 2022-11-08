/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import { useFetchUser } from "../../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUOFromLocalCookie,
  getUOFromServerCookie,
} from "../../../lib/auth";

import { fetcher } from "../../../lib/api";
import { Layout } from "../../../components";
import LayoutCliente from "../../../components/cliente/LayoutCliente";
import { Button, Grid, Row, Text } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";

export default function all_inmuebles({ inmuebles }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Inmuebles",
    onAfterPrint: () => {
      console.log("Reporte Listado de Solicitudes generado exitosamente");
    },
  });

  return (
    <Layout user={user} titulo="Cliente" baseURL="./../../">
      <LayoutCliente>
        <>
          <Grid>
            <Row>
              <Button onClick={handlePrint}> Imprimir Reporte </Button>
            </Row>
            <Row>
              {inmuebles.data && inmuebles.data.length > 0 ? (
                <div
                  ref={componentRef}
                  style={{
                    width: "100%",
                    height:
                      typeof window !== "undefined"
                        ? window.innerHeight
                        : "60%",
                  }}
                >
                  <h1>Listado de Inmuebles</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>DESCRIPCI&Oacute;N</th>
                        <th>DIRECCI&Oacute;N</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inmuebles &&
                        inmuebles.data.map((inmuebleItem, i) => {
                          return (
                            <tr key={inmuebleItem.id}>
                              <td>{i + 1}</td>
                              <td>{inmuebleItem.attributes.descripcion}</td>
                              <td>{inmuebleItem.attributes.direccion}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2>No existen Inmuebles registrados</h2>
              )}
            </Row>
          </Grid>
        </>
      </LayoutCliente>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const uo =
    typeof window !== "undefined"
      ? getUOFromLocalCookie()
      : getUOFromServerCookie(req);

  const inmueblesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?populate[0]=centrodecosto&filters[unidadorganizativa][id][$eq]=${uo}`,
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