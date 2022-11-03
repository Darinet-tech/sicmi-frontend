

import { Layout } from "../../components";
import { useFetchUser } from "../../lib/authContext";

export default function admin() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Admin">
      <LayoutAdmin>Bienvenido Administrador!!!</LayoutAdmin>
    </Layout>
  );
}