import React from "react";
import { Button, Card, Grid, Dropdown, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuAdmin = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "crear_usuario":
        router.push("../admin/crear_usuario");
        break;
      case "listar_usuario":
        break;
      case "crear_solicitud":
        break;
      case "listar_solicitud":
        break;

      default:
        break;
    }
  };

  return (
    <Grid xl={12} css={{  }}>
      <Card
        css={{
          marginTop: "1px",
          height: "max-content",
        }}
      >
        <Card.Body css={{ textAlign: "center" }}>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xs={12}>
              <Dropdown shadow>
                <Dropdown.Button
                  
                  color="primary"
                  style={{ width: "100%" }}
                >
                  USUARIO
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="crear_usuario" color="primary">
                    CREAR USUARIO
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_usuario" color="primary">
                    LISTAR USUARIOS
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button
                  shadow
                  color="success"
                  style={{ width: "100%" }}
                >
                  SOLICITUD
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="crear_usuario" color="success">
                    CREAR SOLICITUD
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_usuario" color="success">
                    LISTAR SOLICITUDES
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button
                  shadow
                  color="secondary"
                  style={{ width: "100%" }}
                >
                  INMUEBLE
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="crear_usuario" color="secondary">
                    CREAR INMUEBLE
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_usuario" color="secondary">
                    LISTAR INMUEBLES
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button
                  shadow
                  color="warning"
                  style={{ width: "100%" }}
                >
                  SOBREGIRO
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="solicitar_sobregiro" color="warning">
                    SOLICITAR SOBREGIRO
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_sobregiro" color="warning">
                    LISTAR SOBREGIROS
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button shadow color="error" style={{ width: "100%" }}>
                  ESTADÍSTICAS
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_estadisticas" color="error">
                    LISTAR ESTADÍSTICAS
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Grid>
  );
};

export default MenuAdmin;
