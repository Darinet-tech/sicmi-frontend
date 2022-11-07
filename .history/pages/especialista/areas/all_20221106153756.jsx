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
import LayoutA from "../../../components/admin/LayoutAdmin";
import { Button, Grid, Row, Text } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";

export default function all_areas({ areas }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Areas",
    onAfterPrint: () => {
      console.log("Reporte Listado de Areas generado exitosamente");
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
              {areas.data && areas.data.length > 0 ? (
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
                  <h1>Listado de Areas</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>NOMBRE</th>
                        <th>RESPONSABLE</th>
                        <th>LOCALES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {areas &&
                        areas.data.map((areaItem, i) => {
                          return (
                            <tr key={areaItem.id}>
                              <td>{i + 1}</td>
                              <td>{areaItem.attributes.nombre}</td>
                              <td>
                                {areaItem.attributes.responsable.data
                                  ? areaItem.attributes.responsable.data
                                      .attributes.username
                                  : ""}
                              </td>
                              <td>
                                {areaItem.attributes.locales &&
                                  areaItem.attributes.locales.data.map(
                                    (localItem) => {
                                      return (
                                        <div key={localItem.id}>
                                          {localItem.attributes.nombre}
                                        </div>
                                      );
                                    }
                                  )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2>No existen Areas registradas</h2>
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
      areas: areasResponse,
    },
  };
}
