/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Button, Grid, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useFetchUser } from "../../../lib/authContext";
import {
  getIdFromLocalCookie,
  getIdFromServerCookie,
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../lib/auth";

import { fetcher } from "../../../lib/api";
import { Layout } from "../../../components";
import LayoutCliente from "../../../components/cliente/LayoutCliente";
import AddSolicitud from "../../../components/solicitud/AddSolicitud";
import TableSolicitudes from "../../../components/solicitud/TableSolicitudes";
import ModeloSolicitud from "./ModeloSolicitud";

export default function solicitudes({ solicitudes, locales }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const iduser = typeof window !== "undefined" ? getIdFromLocalCookie() : "";
  const router = useRouter();

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes?populate[0]=local&populate[1]=elaboradopor&populate[2]=demanda_recursos&populate[3]=ordenes_de_trabajos&filters[local][arearesponsable][responsable][id][$eq]=${iduser}&pagination[page]=${pageIndex}&pagination[pageSize]=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      },
    ],
    fetcher,
    {
      fallbackData: solicitudes,
      console.log(data)
    }
  );

  return (
    <Layout user={user} titulo="Cliente" baseURL="./../">
      <LayoutCliente>
        <>
          <Grid>
            <Row>
              <AddSolicitud locales={locales} />

              <Button
                ghost
                auto
                onClick={() => router.push("/cliente/solicitudes/all")}
              >
                Mostrar todos
              </Button>
            </Row>
            <Row>
              {solicitudes.data && solicitudes.data.length > 0 ? (
                <>
                  <Grid>
                    <Row>
                      <TableSolicitudes user={user} solicitudes={data} />
                    </Row>
                    <Row>
                      <Grid.Container gap={2}>
                        <Grid>
                          <Button
                            auto
                            rounded
                            className={`${
                              pageIndex === 1 ? "bg-gray-300" : "bg-blue-400"
                            }`}
                            disabled={pageIndex === 1}
                            onClick={() => setPageIndex(pageIndex - 1)}
                          >
                            {" "}
                            <FaArrowAltCircleLeft />
                          </Button>
                        </Grid>
                        <Grid>
                          <Button
                            auto
                            rounded
                            className={`${
                              pageIndex ===
                              (data &&
                                data.meta &&
                                data.meta.pagination.pageCount)
                                ? "bg-gray-300"
                                : "bg-blue-400"
                            }`}
                            disabled={
                              pageIndex ===
                              (data &&
                                data.meta &&
                                data.meta.pagination.pageCount)
                            }
                            onClick={() => setPageIndex(pageIndex + 1)}
                          >
                            <FaArrowAltCircleRight />
                          </Button>
                        </Grid>
                        <Grid>
                          <span>{`${pageIndex} de ${
                            data && data.meta && data.meta.pagination.pageCount
                          }`}</span>
                        </Grid>
                      </Grid.Container>
                    </Row>
                  </Grid>
                </>
              ) : (
                <h3>No existen Solicitudes registradas</h3>
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes?populate[0]=local&populate[1]=elaboradopor&populate[2]=demanda_recursos&populate[3]=ordenes_de_trabajos&filters[local][arearesponsable][responsable][id][$eq]=${iduser}&pagination[page]=1&pagination[pageSize]=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const localesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/locals?&filters[arearesponsable][responsable][id][$eq]=${iduser}`,
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
      locales: localesResponse,
    },
  };
}
