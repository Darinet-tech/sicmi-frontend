/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import { useFetchUser } from "../../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../lib/auth";

import { fetcher } from "../../../lib/api";
import { Layout } from "../../../components";
import LayoutAdmin from "../../../components/admin/LayoutAdmin";
import { Button, Grid, Row, Text } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";

export default function all_unidadesorganizativas ({ unidadesorganizativas }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Unidades-Organizativas",
    onAfterPrint: () => {
      console.log(
        "Reporte Listado de Unidades Organizativas generado exitosamente"
      );
    },
  });

  return (
    <Layout user={user} titulo="Admin" baseURL="./../../">
      <LayoutAdmin>
        <>
          <Grid>
            <Row>
              <Button onClick={handlePrint}> Imprimir Reporte </Button>
            </Row>
            <Row>
              {unidadesorganizativas .data &&
              unidadesorganizativas .data.length > 0 ? (
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
                  <h1>Listado de Unidades Organizativas</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>NOMBRE</th>
                        <th>ACRÓNIMO</th>
                        <th>INMUEBLES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unidadesorganizativas &&
                        unidadesorganizativas.data.map((uoItem, i) => {
                          return (
                            <tr key={uoItem.id}>
                              <td>{i + 1}</td>
                              <td>{uoItem.attributes.nombre}</td>
                              <td>{uoItem.attributes.acronimo}</td>
                              <td>
                                {uoItem.attributes.inmuebles.data
                                  ? uoItem.attributes.inmuebles.data.length
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2>No existen Unidades Organizativas registradas</h2>
              )}
            </Row>
          </Grid>
        </>
      </LayoutAdmin>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const uoResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/unidadorganizativas?populate[0]=inmuebles`,
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
      unidadesorganizativas: uoResponse,
    },
  };
}
