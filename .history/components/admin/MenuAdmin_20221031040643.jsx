import React from "react";
import { Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuAdmin = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "crear_usuario":
        router.push("../admin/listar");
        break;      
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
                <Dropdown.Button>MENU</Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  aria-label="Actions"
                  css={{ textAlign: "center", height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_usuarios" color="warning">
                    USUARIOS
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
