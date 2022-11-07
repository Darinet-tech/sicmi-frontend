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
import LayoutAdmin from "../../../components/admin/LayoutAdmin";
import { Button, Grid, Row, Text } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";

export default function all_unidadorganizativas({ unidadorganizativa }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Unidades-Organizativas",
    onAfterPrint: () => {
      console.log("Reporte Listado de Unidades Organizativas generado exitosamente");
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
              {unidadorganizativas.data && unidadorganizativas.data.length > 0 ? (
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
                      {unidadorganizativas &&
                        unidadorganizativas.data.map((unidadorganizativaItem, i) => {
                          return (
                            <tr key={unidadorganizativaItem.id}>
                              <td>{i + 1}</td>
                              <td>{unidadorganizativaItem.attributes.nombre}</td>
                              <td>{unidadorganizativaItem.attributes.acronimo}</td>
                              <td>
                                {unidadorganizativaItem.attributes.inmuebles.data
                                  ? unidadorganizativaItem.attributes.inmuebles.data
                                      .attributes.username
                                  : ""}
                              </td>
                              {/* <td>
                                {unidadorganizativaItem.attributes.locales &&
                                  areaItem.attributes.locales.data.map(
                                    (localItem) => {
                                      return (
                                        <div key={localItem.id}>
                                          {localItem.attributes.nombre}
                                        </div>
                                      );
                                    }
                                  )}
                              </td> */}
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

  const uo =
    typeof window !== "undefined"
      ? getUOFromLocalCookie()
      : getUOFromServerCookie(req);

  const areasResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/areas?populate[0]=responsable&populate[1]=locales&filters[unidadorganizativa][id][$eq]=${uo}`,
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
      unidad: areasResponse,
    },
  };
}
