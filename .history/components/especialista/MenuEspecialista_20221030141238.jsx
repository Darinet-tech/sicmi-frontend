import React from "react";
import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuEspecialista = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "listar_solicitud":
        router.push("../especialista/solicitudes");
        break;
      case "listar_inmueble":
        router.push("../especialista/inmuebles");
        break;
      default:
        break;
    }
  };

  return (
    <Grid xl={12}>
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
                <Dropdown.Button>MENU</Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_solicitud" color="warning">
                    SOLICITUDES
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_inmueble">INMUEBLES</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Grid>
  );
};

export default MenuEspecialista;
