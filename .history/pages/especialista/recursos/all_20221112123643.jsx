/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from "react";
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

export default function all_recursos({ recursos }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
const [recursos, setrecursos] = useState({})

fe

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
                        recursos.data.map((recursosItem, i) => {
                          return (
                            <tr key={recursosItem.id}>
                              <td>{i + 1}</td>
                              <td>{recursosItem.attributes.codigo}</td>
                              <td>{recursosItem.attributes.nomenclador}</td>
                              <td>{recursosItem.attributes.precio}</td>
                              <td>{recursosItem.attributes.libreutilizacion}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2>No existen Recursos registrados</h2>
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

  const demanda_recursosResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos?populate[0]=demanda_recursos&filters[unidadorganizativa][id][$eq]=${uo}`,
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
      demanda_recursos: demanda_recursosResponse,
    },
  };
}
