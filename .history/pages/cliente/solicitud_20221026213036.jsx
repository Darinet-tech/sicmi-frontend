import { useFetchUser } from "../../lib/authContext";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { Authentication, Layout } from "../../components";
import LayoutCliente from "../../components/LayoutCliente";

export default function solicitud({ solicitud }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?pagination[page]=${pageIndex}&pagination[pageSize]=5`,
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
    <Layout user={user} titulo="Cliente" baseURL="./../">
      <LayoutCliente>
      {!loading &&
        (user ? (
          <Table
            aria-label="Listado de Solicitud"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>DESCRIPCION</Table.Column>
              <Table.Column>DIRECCION</Table.Column>
              <Table.Column>CENTRO DE COSTO</Table.Column>
            </Table.Header>
            <Table.Body>
              {inmuebles &&
                inmuebles.data.map((inmuebleItem) => {
                  return (
                    <Table.Row key={inmuebleItem.id}>
                      <Table.Cell>
                        {inmuebleItem.attributes.descripcion}
                      </Table.Cell>
                      <Table.Cell>
                        {inmuebleItem.attributes.direccion}
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
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