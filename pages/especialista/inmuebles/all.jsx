/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import { useFetchUser } from "../../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../lib/auth";

import { fetcher } from "../../../lib/api";
import { Layout } from "../../../components";
import LayoutEspecialista from "../../../components/especialista/LayoutEspecialista";
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
      console.log("Reporte Listado de Inmuebles generado exitosamente");
    },
  });

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../">
      <LayoutEspecialista>
        <>
          <Grid>
            <Row>
              <Button onClick={handlePrint}> Imprimir Reporte </Button>
            </Row>
            <Row>
              {inmuebles.data.length === 0 ? (
                <h2>No existen Inmuebles registrados</h2>
              ) : (
                <div
                  ref={componentRef}
                  style={{ width: "100%", height:(typeof window !== 'undefined')?window.innerHeight:"60%" }}
                >
                  <h1>Listado de Inmuebles</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>DESCRIPCI&Oacute;N</th>
                        <th>DIRECCI&Oacute;N</th>
                        <th>CENTRO DE COSTO</th>
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
                              <td>
                                {inmuebleItem.attributes.centrodecosto.data
                                  ? inmuebleItem.attributes.centrodecosto.data
                                      .attributes.centrocosto
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </Row>
          </Grid>
        </>
      </LayoutEspecialista>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const inmueblesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?populate[0]=centrodecosto`,
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
