import { Layout } from "../../components";
import LayoutSupervisor from "../../components/LayoutSupervisor";
import { useFetchUser } from "../../lib/authContext";

export default function supervisor() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Supervisor">
      <LayoutSupervisor>Bienvenido Administrador!!!</LayoutSupervisor>
    </Layout>
  );
}