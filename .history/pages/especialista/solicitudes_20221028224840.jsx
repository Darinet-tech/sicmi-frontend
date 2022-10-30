/* eslint-disable react-hooks/rules-of-hooks */
import { useFetchUser } from "../../lib/authContext";
import { Table, Button, Card, Tooltip, User, Text } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { Authentication, Layout } from "../../components";
import LayoutEspecialista from "../../components/LayoutEspecialista";


export default function solicitudes({ inmuebles }) {
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
    <Layout user={user} titulo="Especialista" baseURL="./../">
      <LayoutEspecialista>
      {!loading &&
        (user ? (
          <Card css={{ marginTop: "10px" }}>
          <Button
            
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              SOLICITUDES
            </Text>
            <Table
            aria-label="Listado de Inmuebles"
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
            
          </Card.Body>
          
          
        </Card>
          
        ) : (
          <main>
            <Authentication />
          </main>
        ))}
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
