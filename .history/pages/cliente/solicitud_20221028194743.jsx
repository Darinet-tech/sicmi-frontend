import { useFetchUser } from "../../lib/authContext";
import Select from "react-select";
import { Spacer, Grid, Textarea, Card, Button } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { Authentication, Layout } from "../../components";
import LayoutCliente from "../../components/LayoutCliente";
import styles from "../../styles/solicitud.module.css";

export default function solicitud({ solicitud }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const unidadOrganizativa = [
    { label: "Unidad Organizativa 1", value: "uo1" },
    { label: "Unidad Organizativa 2", value: "uo2" },
    { label: "Unidad Organizativa 3", value: "uo3" },
  ];
  const nombreInmueble = [
    { label: "Inmueble 1", value: "i1" },
    { label: "Inmueble 2", value: "i2" },
    { label: "Inmueble 3", value: "i3" },
  ];

  const areaSolicitante = [
    { label: "Área 1", value: "a1" },
    { label: "Área 2", value: "a2" },
    { label: "Área 3", value: "a3" },
  ];

  const centroCosto = [
    { label: "12RP1001", value: "cc1" },
    { label: "12RP1002", value: "cc2" },
    { label: "12RP1003", value: "cc3" },
  ];

  const localIncidencia = [
    { label: "Local 1", value: "l1" },
    { label: "Local 2", value: "l2" },
    { label: "Local 3", value: "l3" },
  ];

  const handleSelectChange = ({ value }) => {
    console.log(value);
  };
  return (
    <Layout user={user} titulo="Cliente" baseURL="./../">
      <LayoutCliente>
        {!loading &&
          (user ? (
            <Grid.Container gap={1}></Grid.Container>
            
              
            
          ) : (
            <main>
              <Authentication />
            </main>
          ))}
      </LayoutCliente>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const inmueblesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?pagination[page]=1&pagination[pageSize]=5`,
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
