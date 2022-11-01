import { Grid } from "@nextui-org/react";
import React from "react";
import MenuSupervisor from "./MenuSupervisor";

const LayoutSupervisor = ({ user, loading = false, children }) => {
  return (
    <Grid.Container gap={2} light="true">
      <Grid xl={3}>
        <MenuSupervisor></MenuSupervisor>
      </Grid>
      <Grid xl={9}>
        <main>{children}</main>
      </Grid>
    </Grid.Container>
  );
};

export default LayoutSupervisor;