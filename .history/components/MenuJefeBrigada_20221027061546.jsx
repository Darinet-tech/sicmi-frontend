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
                <Dropdown.Button>ORDEN DE TRABAJO</Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  aria-label="Actions"
                  css={{ height: "max-content", wi }}
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
