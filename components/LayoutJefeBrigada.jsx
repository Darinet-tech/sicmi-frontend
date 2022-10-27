import { Grid } from "@nextui-org/react";
import React from "react";
import MenuJefeBrigada from "./MenuJefeBrigada";

const LayoutJefeBrigada = ({ user, loading = false, children }) => {
  return (
    <Grid.Container gap={2} light="true">
      <Grid xl={3}>
        <MenuJefeBrigada></MenuJefeBrigada>
      </Grid>
      <Grid xl={9}>
        <main>{children}</main>
      </Grid>
    </Grid.Container>
  );
};

export default LayoutJefeBrigada;