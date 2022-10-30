import { Grid } from "@nextui-org/react";
import React from "react";
import MenuAdmin from "./MenuCliente";

const LayoutCliente = ({ user, loading = false, children }) => {
  return (
    <Grid.Container gap={2} light="true">
      <Grid xl={3}>
        <MenuCliente></MenuCliente>
      </Grid>
      <Grid xl={9}>
        <main>{children}</main>
      </Grid>
    </Grid.Container>
  );
};

export default LayoutCliente;