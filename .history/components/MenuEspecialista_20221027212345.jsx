import React from "react";
import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuEspecialista = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "listar_solicitud":
        break;
      case "crear_inmueble":
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
                <Dropdown.Button light bordered color="gradient" style={{ margin:"auto", width:"100%"}}>SOLICITUD</Dropdown.Button>
                <Dropdown.Menu                
                  variant="light"
                  aria-label="Actions"
                  css={{ height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_solicitud">
                    LISTAR SOLICITUDES
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button light bordered color="gradient" style={{  width:"100%"}}>INMUEBLE</Dropdown.Button>
                <Dropdown.Menu
                  color="primary"
                  variant="light"
                  aria-label="Actions"
                  css={{ height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="crear_inmueble" color="success">
                    CREAR INMUEBLE
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_inmueble" variant="light" color="warning">
                    LISTAR INMUEBLES
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

export default MenuEspecialista;
