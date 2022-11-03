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
} from "../../../lib/auth";

import { fetcher } from "../../../lib/api";
import { Layout } from "../../../components";
import LayoutEspecialista from "../../../components/especialista/LayoutEspecialista";
import AddInmueble from "../../../components/inmueble/AddInmueble";
import TableInmuebles from "../../../components/inmueble/TableInmuebles";

export default function inmuebles({ inmuebles, centrodecostos }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?populate[0]=centrodecosto&pagination[page]=${pageIndex}&pagination[pageSize]=5`,
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
          <Grid>
            <Row>
              <AddInmueble centrodecostos={centrodecostos} />

              <Button
                ghost
                auto
                onClick={() => router.push("/especialista/inmuebles/all")}
              >
                Mostrar todos
              </Button>
            </Row>
            <Row>
              {inmuebles.data.length === 0 ? (
                <h2>No existen Inmuebles registrados</h2>
              ) : (
                <TableInmuebles inmuebles={data} />
              )}
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
                      pageIndex === (data && data.meta.pagination.pageCount)
                        ? "bg-gray-300"
                        : "bg-blue-400"
                    }`}
                    disabled={
                      pageIndex === (data && data.meta.pagination.pageCount)
                    }
                    onClick={() => setPageIndex(pageIndex + 1)}
                  >
                    <FaArrowAltCircleRight />
                  </Button>
                </Grid>
                <Grid>
                  <span>{`${pageIndex} de ${
                    data && data.meta.pagination.pageCount
                  }`}</span>
                </Grid>
              </Grid.Container>
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?populate[0]=centrodecosto&pagination[page]=1&pagination[pageSize]=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const centrosResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/centrodecostos`,
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
      centrodecostos: centrosResponse,
    },
  };
}
