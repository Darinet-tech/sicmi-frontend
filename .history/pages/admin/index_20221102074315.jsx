

import { useFetchUser } from "../../lib/authContext";

export default function admin() {
  const { user, loading } = useFetchUser();
  return (
    <Layo user={user} titulo="Admin">
      <LayoutAdmin>Bienvenido Administrador!!!</LayoutAdmin>
    </Layo>
  );
}