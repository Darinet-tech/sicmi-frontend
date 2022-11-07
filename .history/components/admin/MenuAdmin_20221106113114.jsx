import React from "react";
import { Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuAdmin = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "listar_usuarios":
        router.push("../admin/usuarios");
        break;
      case "listar_areas":
        router.push("/especialista/areas");
        break;
      case "listar_inmuebles":
        router.push("/especialista/inmuebles");
      default:
        break;
    }
  };

  return (
    <Grid xl={12} css={{}}>
      <Card
        css={{
          marginTop: "1px",
          height: "max-content",
        }}
      >
        <Card.Body css={{ textAlign: "center" }}>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button style={{ w }} light bordered color="gradient">
                  MENU
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_usuarios" color="primary">
                    USUARIOS
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_areas" color="secondary">
                    AREAS
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_inmuebles" color="success">
                    INMUEBLES
                  </Dropdown.Item>
                  <Dropdown.Item key="solicitudes" color="warning">
                    SOLICITUDES
                  </Dropdown.Item>
                  <Dropdown.Item key="ordenes" color="default">
                    ÓRDENES DE TRABAJO
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
