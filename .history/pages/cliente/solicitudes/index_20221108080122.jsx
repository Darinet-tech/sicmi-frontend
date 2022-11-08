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
import LayoutCliente from "../../../components/cliente/LayoutCliente";
import AddSolicitud from "../../../components/solicitud/AddSolicitud";
import TableSolicitudes from "../../../components/solicitud/TableSolicitudes";

export default function solicitudes({ solicitudes }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
 
  const router = useRouter();

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes?populate[0]=elaboradopor&pagination[page]=${pageIndex}&pagination[pageSize]=5`,
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
    }
  );

  return (
    <Layout user={user} titulo="Cliente" baseURL="./../">
      <LayoutCliente>
        <>
          {uo ? (
            
          ) : (
            <h3>
              Usted no tiene asignado ninguna Unidad Organizativa, por favor
              contacte con su Administrador
            </h3>
          )}
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
