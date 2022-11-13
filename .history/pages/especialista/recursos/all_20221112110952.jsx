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

export default function all_recursos({ inmuebles }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Recursos",
    onAfterPrint: () => {
      console.log("Reporte Listado de Recursos generado exitosamente");
    },
  });

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../">
      <LayoutEspecialista>
        <>
          <Grid>
            <Row>
              <Button onClick={handlePrint}> Imprimir Listado </Button>
            </Row>
            <Row>
              {recursos.data && recursos.data.length > 0 ? (
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
                  <h1>Listado de Recursos</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>C&Oacute;DIGO</th>
                        <th>NOMENCLADOR</th>
                        <th>PRECIO</th>
                        <th>LIBRE UTILIZACI&Oacute;N</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recursos &&
                        recursos.data.map((demanda-recursosItem, i) => {
                          return (
                            <tr key={demanda-recursosItem.id}>
                              <td>{i + 1}</td>
                              <td>{demanda-recursosItem.attributes.descripcion}</td>
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
