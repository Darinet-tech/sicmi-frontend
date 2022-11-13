/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import { useFetchUser } from "../../../lib/authContext";
import {
  getIdFromLocalCookie,
  getIdFromServerCookie,
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
import ModeloSolicitud from "./ModeloSolicitud";

export default function all_solicitudes({ solicitudes }) {
  const { user, loading } = useFetchUser();
  const componentRefs = useRef();
  const handlePrintModelo = useReactToPrint({
    content: () => componentRefs.current,
    documentTitle: "Listado-Solicitudes",
    onAfterPrint: () => {
      console.log("Reporte Listado de Solicitudes generado exitosamente");
    },


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Solicitudes",
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
              {solicitudes.data && solicitudes.data.length > 0 ? (
                <div
                  // ref={componentRef} 
                  style={{
                    width: "100%",
                    height:
                      typeof window !== "undefined"
                        ? window.innerHeight
                        : "60%",
                  }}
                >
                  <h1>Listado de Solicitudes</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>LOCAL</th>
                        <th>DESCRIPCION</th>
                        <th>FECHA INICIO</th>
                        <th>FECHA FIN</th>
                        <th>ELABORADA POR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solicitudes &&
                        solicitudes.data.map((solicitudItem, i) => {
                          return (
                            <tr key={solicitudItem.id}>
                              <td>{i + 1}</td>
                              <td>
                                {solicitudItem.attributes.local &&
                                solicitudItem.attributes.local.data
                                  ? solicitudItem.attributes.local.data
                                      .attributes.nombre
                                  : ""}
                              </td>
                              <td>{solicitudItem.attributes.descripcion}</td>
                              <td>{solicitudItem.attributes.fecha_ini}</td>
                              <td>{solicitudItem.attributes.fecha_fin}</td>
                              <td>
                                {solicitudItem.attributes.elaboradopor &&
                                solicitudItem.attributes.elaboradopor.data
                                  ? solicitudItem.attributes.elaboradopor.data
                                      .attributes.username
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2>No existen Solicitudes registradas</h2>
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

  const iduser =
    typeof window !== "undefined"
      ? getIdFromLocalCookie()
      : getIdFromServerCookie(req);

  const solicitudesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes?populate[0]=local&populate[1]=elaboradopor&filters[local][arearesponsable][responsable][id][$eq]=${iduser}`,
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
      solicitudes: solicitudesResponse,
    },
  };
}
