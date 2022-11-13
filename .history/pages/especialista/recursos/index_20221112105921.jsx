/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Button, Grid, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
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
import AddRecurso from "../../../components/inmueble/AddRecurso";
import TableRecursos from "../../../components/inmueble/TableRecursos";

export default function recursos({ inmuebles }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  
  const router = useRouter();

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos?populate[0]=demanda_recursos&pagination[page]=${pageIndex}&pagination[pageSize]=10`,
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
      fallbackData: inmuebles,
    }
  );

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../">
      <LayoutEspecialista>
        <>
          {uo ? (
            <Grid>
              <Row>
                <AddRecurso />

                <Button
                  ghost
                  auto
                  onClick={() => router.push("/especialista/recursos/all")}
                >
                  Mostrar todos
                </Button>
              </Row>
              <Row>
                {recursos.data && recursos.data.length > 0 ? (
                  <>
                    <Grid>
                      <Row>
                        <TableRecursos recursos={data} />
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
                              data &&
                              data.meta &&
                              data.meta.pagination.pageCount
                            }`}</span>
                          </Grid>
                        </Grid.Container>
                      </Row>
                    </Grid>
                  </>
                ) : (
                  <h3>No existen Recursi registrados</h3>
                )}
              </Row>
            </Grid>
          ) : (
            <h3>
              Usted no tiene asignado ninguna Unidad Organizativa, por favor
              contacte con su Administrador
            </h3>
          )}
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?populate[0]=centrodecosto&filters[unidadorganizativa][id][$eq]=${uo}&pagination[page]=1&pagination[pageSize]=5`,
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
