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
<<<<<<< HEAD:components/MenuEspecialista.jsx
      case "crear_inmueble":
        router.push("../especialista/crear_inmueble");
        break;
=======
>>>>>>> 325f1422e99e59b82855798f7f48aed0c2ce91b3:components/especialista/MenuEspecialista.jsx
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
<<<<<<< HEAD:components/MenuEspecialista.jsx
                <Dropdown.Button light bordered color="gradient" style={{ width:"100%" }}>SOLICITUD</Dropdown.Button>
                <Dropdown.Menu                
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_solicitud" color="warning">
                    LISTAR SOLICITUDES
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} justify="flex-start">
            <Grid xl={12}>
              <Dropdown>
                <Dropdown.Button light bordered color="gradient" style={{ width:"100%"}}>INMUEBLE</Dropdown.Button>
                <Dropdown.Menu
                  color="primary"
                  variant="shadow"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="crear_inmueble" color="success" style={{ textAlign: "center", width:"100%"}}>
                    CREAR INMUEBLE
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_inmueble" color="warning" style={{ textAlign: "center", width:"100%"}}>
                    LISTAR INMUEBLES
=======
                <Dropdown.Button>MENU</Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  aria-label="Actions"
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_solicitud">
                    SOLICITUDES
>>>>>>> 325f1422e99e59b82855798f7f48aed0c2ce91b3:components/especialista/MenuEspecialista.jsx
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
