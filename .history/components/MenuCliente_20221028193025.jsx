import React from "react";
import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";
import styles from "..//solicitud.module.css"

const MenuCliente = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "crear_solicitud":
        router.push("../cliente/solicitud");
        break;
      case "listar_solicitud":
        
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
                <Dropdown.Button
                  light
                  bordered
                  color="gradient"
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
                  <Dropdown.Item key="crear_solicitud" color="success">
                    CREAR SOLICITUD
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_solicitud" color="warning">
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
