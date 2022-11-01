import { Layout } from "../../components";
import LayoutAdmin from "../../components/LayoutAdmin";
import { useFetchUser } from "../../lib/authContext";

export default function sesion() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Cliente">
      <LayoutAdmin>Bienvenido Administrador!!!</LayoutAdmin>
    </Layout>
  );
}