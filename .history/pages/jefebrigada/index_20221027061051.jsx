import { Layout } from "../../components";
import LayoutJefeBrigada from "../../components/LayoutJ";
import { useFetchUser } from "../../lib/authContext";

export default function cliente() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Cliente">
      <LayoutCliente>Bienvenido Cliente!!!</LayoutCliente>
    </Layout>
  );
}