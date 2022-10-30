import React from "react";
import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuAdmin = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "crear_usuario":
        router.push("../admin/usuario");
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
                  
                  shadow color="primary"
                  style={{ width: "100%" }}
                >
                  USUARIO
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="crear_usuario" color="success">
                    CREAR USUARIO
                  </Dropdown.Item>
                  <Dropdown.Item key="listar_usuario" color="warning">
                    LISTAR USUARIO
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
