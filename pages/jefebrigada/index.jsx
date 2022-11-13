/* eslint-disable react-hooks/rules-of-hooks */
import { Layout } from "../../components";
import LayoutJefeBrigada from "../../components/jefebrigada/LayoutJefeBrigada";
import { useFetchUser } from "../../lib/authContext";

export default function jefebrigada() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Jefe de Brigada">
      <LayoutJefeBrigada>Bienvenido Jefe de Brigada!!!</LayoutJefeBrigada>
    </Layout>
  );
}
