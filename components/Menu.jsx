import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { useContext, useState } from "react";
import { UIContext } from "../components/context";
import { Formulario } from "./Formulario";

import React from "react";

export const Menu = ({ mostrar }) => {
  const router = useRouter()
  const { seleccion } = useContext(UIContext);

  const [valor, setValor] = useState("Opcion");

  const enviar = () => {
    console.log(valor);
    seleccion(valor);
  };

  return (
    <Grid.Container gap={2} light>
      {mostrar == "admin" ? (
        <Grid xs={3}>
          <Card
            css={{
              mw: "450px",
              marginTop: "10px",
              height: "max-content",
            }}
          >
            <Card.Body css={{ textAlign: "center" }}>
              <Grid.Container gap={2} color="primary">
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button css={{ width: "100px" }}>
                        USUARIO
                      </Dropdown.Button>
                      <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                        css={{ height: "110px" }}
                      >
                        <Dropdown.Item key="crear_usuario">
                          <Button
                            onPress={() => seleccion("crear_usuario")}
                            color="success"
                          >
                            CREAR USUARIO
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item key="listar_usuario">
                          <Button
                            css={{ marginTop: "20px" }}
                            onPress={() => seleccion("listar_usuario")}
                            color="warning"
                          >
                            LISTAR USUARIO
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      ) : mostrar == "especialista" ? (
        <Grid xl={3}>
          <Card
            css={{
              mw: "450px",
              marginTop: "10px",
              height: "max-content",
            }}
          >
            <Card.Body css={{ textAlign: "center" }}>
              <Grid.Container gap={1} justify="flex-start">
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button>SOLICITUD</Dropdown.Button>
                      <Dropdown.Menu
                        variant="light"
                        aria-label="Actions"
                        selectedKeys={valor}
                        onSelectionChange={setValor}
                        on={enviar}
                        css={{ height: "70px" }}
                      >
                        <Dropdown.Item key="listar_solicitud">
                          <Button
                            css={{ marginTop: "20px" }}
                            onPress={() => seleccion("listar_solicitud")}
                            color="warning"
                          >
                            LISTAR SOLICITUDES
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
              <Grid.Container gap={1} justify="flex-start">
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button>INMUEBLE</Dropdown.Button>
                      <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                        css={{ height: "110px" }}
                      >
                        <Dropdown.Item key="crear_inmueble">
                          <Button
                            onPress={() => seleccion("crear_inmueble")}
                            color="success"
                          >
                            CREAR INMUEBLE
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item key="listar_inmueble">
                          <Button
                            css={{ marginTop: "20px" }}
                            onPress={() => {router.push('../especialista/inmuebles')}}
                            color="warning"
                          >
                            LISTAR INMUEBLES
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      ) : mostrar == "jefebrigada" ? (
        <Grid xs={2}>
          <Card
            css={{
              mw: "450px",
              marginTop: "10px",
              height: "max-content",
            }}
          >
            <Card.Body css={{ textAlign: "center" }}>
              <Grid.Container gap={1.5} justify="flex-start" auto>
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button>ORDEN DE TRABAJO</Dropdown.Button>
                      <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                        css={{ height: "75px" }}
                      >
                        <Dropdown.Item key="listar_ordenes">
                          <Button
                            css={{ marginTop: "20px" }}
                            onPress={() => seleccion("listar_ordenes")}
                            color="warning"
                          >
                            LISTAR ÓRDENES DE TRABAJO
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      ) : mostrar == "director" ? (
        <Grid xs={3}>
          <Card
            css={{
              mw: "450px",
              marginTop: "10px",
              height: "max-content",
            }}
          >
            <Card.Body css={{ textAlign: "center" }}>
              <Grid.Container
                gap={1.5}
                justify="flex-start"
                color="primary"
                auto
              >
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button>ESTADÍSTICAS</Dropdown.Button>
                      <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                        css={{ height: "70px" }}
                      >
                        <Dropdown.Item key="mostrar_estadisticas">
                          <Button
                            onPress={() => seleccion("mostrar_estadisticas")}
                            color="success"
                          >
                            MOSTRAR ESTADÍSTICAS
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>

              <Grid.Container gap={1} justify="flex-start" light>
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button>SOBREGIRO</Dropdown.Button>
                      <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                        css={{ height: "110px" }}
                      >
                        <Dropdown.Item key="solicitar_sobregiro">
                          <Button
                            onPress={() => seleccion("solicitar_sobregiro")}
                            color="success"
                          >
                            SOLICITAR SOBREGIRO
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item key="listar_sobregiro">
                          <Button
                            css={{ marginTop: "20px" }}
                            onPress={() => seleccion("listar_sobregiro")}
                            color="warning"
                          >
                            LISTAR SOBREGIRO
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      ) : mostrar == "cliente" ? (
        <Grid xs={3}>
          <Card
            css={{
              mw: "450px",
              height: "170px",
              marginTop: "10px",
            }}
          >
            <Card.Body css={{ textAlign: "center" }}>
              <Grid.Container gap={1} justify="flex-start">
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button color="primary">
                        SOLICITUD DE MANTENIMIENTO
                      </Dropdown.Button>
                      <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                        selectedKeys={valor}
                        onSelectionChange={setValor}
                        on={enviar}
                        css={{ height: "110px" }}
                      >
                        <Dropdown.Item key="crear_solicitud">
                          <Button
                            onPress={() => seleccion("crear_solmtto")}
                            color="success"
                          >
                            CREAR SOLICITUD
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item key="listar_solicitud">
                          <Button
                            css={{ marginTop: "20px" }}
                            onPress={() => seleccion("listar_solmtto")}
                            color="warning"
                          >
                            MOSTRAR SOLICITUD
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
              <Grid.Container gap={1} justify="flex-start">
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button color="primary">
                        ÓRDENES DE TRABAJO
                      </Dropdown.Button>
                      <Dropdown.Menu
                        variant="light"
                        aria-label="Actions"
                        css={{ height: "65px" }}
                      >
                        <Dropdown.Item key="crear_inmueble">
                          <Button
                            onPress={() => seleccion("listar_ordenent")}
                            color="success"
                          >
                            MOSTRAR OT
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      ) : mostrar == "supervisor" ? (
        <Grid xs={3}>
          <Card
            css={{
              mw: "450px",
              marginTop: "10px",
              height: "max-content",
            }}
          >
            <Card.Body css={{ textAlign: "center" }}>
              <Grid.Container
                gap={1.5}
                justify="flex-start"
                color="primary"
                auto
              >
                <Grid xs={12}>
                  <Grid>
                    <Dropdown>
                      <Dropdown.Button>ESTADÍSTICAS</Dropdown.Button>
                      <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                        selectedKeys={valor}
                        onSelectionChange={setValor}
                        on={enviar}
                        css={{ height: "65px" }}
                      >
                        <Dropdown.Item key="estadisticas">
                          <Button
                            onPress={() => seleccion("estadisticas")}
                            color="warning"
                          >
                            MOSTRAR ESTADÍSTICAS
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      ) : (
        <></>
      )}
      <Grid xs={9}>
        <Formulario></Formulario>
      </Grid>
    </Grid.Container>
  );
};
