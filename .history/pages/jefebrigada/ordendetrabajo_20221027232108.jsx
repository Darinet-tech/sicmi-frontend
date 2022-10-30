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
import LayoutJ from "../../components/LayoutJefeBrigada";

export default function ordendetrabajo({ solicitud }) {
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
            <Grid xl={12}>
              <Card>
                <Card.Body style={{ width: "auto", height:"max-content" }}>
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
                    defaultValue={{ label: "Local donde ocurre la incidencia" }}
                    options={localIncidencia}
                    onChange={handleSelectChange}
                    styles={{ width: "400px", color: "black" }}
                  />
                  <Grid.Container gap={2.5} css={{ mt: "4px", padding: "0" }}>
                    <Grid>
                      <Textarea
                        bordered
                        color="white"
                        status="white"
                        helperColor="white"
                        label="Descripción de las afectaciones"
                        placeholder="Introduzca una breve descripción de la deficiencia o afectación"
                        width="400px"
                      />
                    </Grid>
                  </Grid.Container>
                  <Spacer></Spacer>
                  <Button
                    style={{
                      position: "absolute",
                      marginTop:"40px",
                      bottom: "1px",
                      color: "white",
                      backgroundColor: "#228b22",
                      height: "30px",
                      width:"40px",
                      float:"right"
                    }}
                    
                  >
                    GUARDAR
                  </Button>
                  <Button
                    style={{
                      position: "absolute",
                      padding:"10px",
                      right: "1px",
                      bottom: "1px",
                      color: "white",
                      backgroundColor: "red",
                      height: "30px",
                      width:"40px",
                      
                    }}
                    
                  >
                    CANCELAR
                  </Button>
                </Card.Body>
              </Card>
              
            </Grid>
            
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
