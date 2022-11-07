import React from "react";
import { Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuEspecialista = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "listar_solicitud":
        router.push("../especialista/solicitudes");
        break;
      case "listar_inmuebles":
        router.push("/especialista/inmuebles");
        break;
      case "listar_areas":
        router.push("/especialista/areas");
        break;
      case "listar_locales":
        router.push("/especialista/locales");
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
                <Dropdown.Button style={{ width:"100%" }} light bordered color="gradient">
                  MENU
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_solicitud" color="primary">
                    SOLICITUDES
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_inmuebles" color="secondary">
                    INMUEBLES
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_areas" color="success">
                    ÁREAS
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_locales" color="secondary">
                    LOCALES
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
