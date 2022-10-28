import React from "react";
import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuEspecialista = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "listar_solicitud":
        break;
      case "listar_inmueble":
        router.push("../especialista/inmuebles");
        break;
      default:
        break;
    }
  };

  return (
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
              <Dropdown>
                <Dropdown.Button>MENU</Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  aria-label="Actions"
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_solicitud">
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
