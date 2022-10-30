import { Layout } from "../../components";
import LayoutAdmin from "../../components/LayoutAdmin";
import { useFetchUser } from "../../lib/authContext";

export default function sesionAdmin() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Admin">
      <LayoutAdmin>Bienvenido Administrador!!!</LayoutAdmin>
    </Layout>
  );
}