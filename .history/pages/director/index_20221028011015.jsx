import { Layout } from "../../components";
import LayoutCliente from "../../components/LayoutCliente";
import { useFetchUser } from "../../lib/authContext";

export default function director() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Cliente">
      <LayoutDirector>Bienvenido Cliente!!!</LayoutDirector>
    </Layout>
  );
}