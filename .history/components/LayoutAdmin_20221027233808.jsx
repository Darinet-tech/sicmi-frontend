import { Grid } from "@nextui-org/react";
import React from "react";
import MenuAdmin from "./MenuAdmin";

const LayoutCliente = ({ user, loading = false, children }) => {
  return (
    <Grid.Container gap={2} light="true">
      <Grid xl={3}>
        <MenuAdmin></MenuAdmin>
      </Grid>
      <Grid xl={9}>
        <main>{children}</main>
      </Grid>
    </Grid.Container>
  );
};

export default LayoutAdmin;