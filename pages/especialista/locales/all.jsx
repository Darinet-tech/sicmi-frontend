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
import LayoutEspecialista from "../../../components/especialista/LayoutEspecialista";
import { Button, Grid, Row, Text } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";

export default function all_locales({ locales }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Locales",
    onAfterPrint: () => {
      console.log("Reporte Listado de Locales generado exitosamente");
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
              {locales.data && locales.data.length > 0 ? (
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
                  <h1>Listado de Locales</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>NOMBRE</th>
                        <th>INMUEBLE</th>
                        <th>AREA RESPONSABLE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locales &&
                        locales.data.map((areaItem, i) => {
                          return (
                            <tr key={areaItem.id}>
                              <td>{i + 1}</td>
                              <td>{areaItem.attributes.nombre}</td>
                              <td>
                                {areaItem.attributes.inmueble.data
                                  ? areaItem.attributes.inmueble.data.attributes
                                      .descripcion
                                  : ""}
                              </td>
                              <td>
                                {areaItem.attributes.arearesponsable.data
                                  ? areaItem.attributes.arearesponsable.data
                                      .attributes.nombre
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2>No existen Locales registradas</h2>
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

  const uo =
    typeof window !== "undefined"
      ? getUOFromLocalCookie()
      : getUOFromServerCookie(req);

  const localesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/locals?populate[0]=arearesponsable&populate[1]=inmueble&filters[inmueble][unidadorganizativa][id][$eq]=${uo}`,
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
      locales: localesResponse,
    },
  };
}
