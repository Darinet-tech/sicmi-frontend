import { useFetchUser } from "../../lib/authContext";
import Select from "react-select";
import {
  Spacer,
  Grid,
  Textarea,
  Card,
  Button,
  Row,
  Text,
} from "@nextui-org/react";
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
            <Grid.Container gap={12}>
              <Grid xl={9}>
                <Card css={{ mw: "100%" }}>
                  <Card.Header style={{ background: "navy" }}>
                    <Text h4 style={{ margin: "auto" }}>
                      SOLICITUD DE MANTENIMIENTO
                    </Text>
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body css={{ py: "$10" }}>
                    <Select
                      defaultValue={{ label: "Unidad Organizativa" }}
                      options={unidadOrganizativa}
                      onChange={handleSelectChange}
                      styles={{ width: "400px", color: "black" }}
                    />
                    <Spacer></Spacer>
                    <Select
                      defaultValue={{ label: "Nombre del Inmueble" }}
                      options={nombreInmueble}
                      onChange={handleSelectChange}
                      styles={{ width: "400px", color: "black" }}
                    />
                    <Spacer></Spacer>
                    <Select
                      defaultValue={{ label: "Área solicitante" }}
                      options={areaSolicitante}
                      onChange={handleSelectChange}
                      styles={{ width: "400px", color: "black" }}
                    />
                    <Spacer></Spacer>
                    <Select
                      defaultValue={{ label: "Centro de Costo" }}
                      options={centroCosto}
                      onChange={handleSelectChange}
                      styles={{ width: "400px", color: "black" }}
                    />
                    <Spacer></Spacer>
                    <Select
                      defaultValue={{
                        label: "Local donde ocurre la incidencia",
                      }}
                      options={localIncidencia}
                      onChange={handleSelectChange}
                      styles={{ width: "400px", color: "black" }}
                    />

                    <Textarea
                      bordered
                      color="white"
                      status="white"
                      helperColor="white"
                      label="Descripción de las afectaciones"
                      placeholder="Introduzca una breve descripción de la deficiencia o afectación"
                      width="100%"
                    />
                  </Card.Body>
                  <Card.Divider />
                  <Card.Footer>
                    <Row justify="flex-end">
                      <Button size="sm" light>
                        Cancel
                      </Button>
                      <Button size="sm">Agree</Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
              
            </Grid.Container>
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
