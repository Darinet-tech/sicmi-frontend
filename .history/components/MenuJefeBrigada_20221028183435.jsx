import React from "react";
import { Button, Card, Grid, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

const MenuJefeBrigada = () => {
  const router = useRouter();
  const goto = (key) => {
    switch (key) {
      case "listar_orden":
        router.push("../jefebrigada/ordendetrabajo");
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
                  light
                  bordered
                  color="gradient"
                  style={{ width: "100%" }}
                >
                  ORDEN DE TRABAJO
                </Dropdown.Button>
                <Dropdown.Menu
                  
                  variant="shadow"
                  aria-label="Actions"
                  style={{ textAlign: "center", height: "max-content", width: "100%" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_orden" color="warning">
                    LISTAR ÓRDENDES DE TRABAJO
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Grid>
  );
  return <Grid></Grid>;
};

export default MenuJefeBrigada;
