import React from "react";
import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";



//  router.push("../especialista/inmuebles");
const MenuCliente = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
        case "crear_solicitud":
        break;
      case "listar_solicitud":
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
                <Dropdown.Button>SOLICITUD</Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  aria-label="Actions"
                  css={{ height: "70px" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="crear_solicitud">
                    CREAR SOLICITUD
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_solicitud">
                    LISTAR SOLICITUD
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

export default MenuCliente;
