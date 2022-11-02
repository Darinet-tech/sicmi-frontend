import { Layout } from "../../components";

import { useFetchUser } from "../../lib/authContext";

export default function admin() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Admin">
      <Layout>Bienvenido Administrador!!!</Layout>
    </Layout>
  );
}