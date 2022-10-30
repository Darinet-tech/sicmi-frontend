/* eslint-disable react-hooks/rules-of-hooks */
import { Layout } from "../../components";
import LayoutEspecialista from "../../components/especialista/LayoutEspecialista";
import { useFetchUser } from "../../lib/authContext";

export default function especialista() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Especialista">
      <LayoutEspecialista>Bienvenido Especialista!!!</LayoutEspecialista>
    </Layout>
  );
}
