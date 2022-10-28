import { Layout } from "../../components";
import LayoutJefeBrigada from "../../components/LayoutJefeBrigada";
import { useFetchUser } from "../../lib/authContext";

export default function jefebrigada() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Jefe de Brigada">
      <LayoutJefeBrigada>Bienvenido Cliente!!!</LayoutJefeBrigada>
    </Layout>
  );
}