import { Layout } from "../../components";
import LayoutCliente from "../../components/LayoutCliente";
import { useFetchUser } from "../../lib/authContext";

export default function especialista() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Cliente">
      <LayoutCliente>Bienvenido Cliente!!!</LayoutCliente>
    </Layout>
  );
}