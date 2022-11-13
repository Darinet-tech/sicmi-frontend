import { Grid } from "@nextui-org/react";
import React from "react";
import MenuEspecialista from "./MenuEspecialista";

const LayoutEspecialista = ({ user, loading = false, children }) => {
  return (
    <Grid.Container gap={2} light="true">
      <Grid xl={3}>
        <MenuEspecialista></MenuEspecialista>
      </Grid>
      <Grid xl={9}>
        <main>{children}</main>
      </Grid>
    </Grid.Container>
  );
};

export default LayoutEspecialista;
