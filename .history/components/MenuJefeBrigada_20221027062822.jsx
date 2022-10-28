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
          mw: "450px",
          marginTop: "10px",
          height: "max-content",
          width:"max-content",
        }}
      >
        <Card.Body css={{ textAlign: "center" }}>
          <Grid.Container gap={1} justify="center">
            <Grid xl={3}>
              <Dropdown>
                <Dropdown.Button light bordered color="gradient">ORDEN DE TRABAJO</Dropdown.Button>
                <Dropdown.Menu
                color="primary"
                  variant="light"
                  aria-label="Actions"
                  style={{ height: "max-content" }}
                  onAction={goto}
                >
                  <Dropdown.Item key="listar_orden">
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
};

export default MenuJefeBrigada;
