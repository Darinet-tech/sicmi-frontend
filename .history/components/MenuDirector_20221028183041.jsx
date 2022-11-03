import React from "react";
import { Button, Card, Grid, Dropdown, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuDirector = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "solicitar_sobregiro":
        router.push("../director/sobregiro");
        break;
      case "listar_sobregiro":
        break;

      case "listar_estadísticas":
        break;

      default:
        break;
    }
  };

  return (
    <Grid xl={12}>
      <Card
        css={{
          marginTop: "10px",
          height: "max-content",
        }}
      >
        <Card.Body css={{ textAlign: "center" }}>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button
                  light
                  bordered
                  color="gradient"
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
                  <Dropdown.Item key="solicitar_sobregiro" color="success">
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
                <Dropdown.Button
                  light
                  bordered
                  color="gradient"
                  style={{ width: "100%" }}
                >
                  ESTADÍSTICA
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_sobregiro" color="WARNING">
                    MOSTRAR ESTADÍSTICAS
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

export default MenuDirector;
