import { Layout } from "../../components";
import LayoutSupervisor from "../../components/LayoutSupervisor";
import { useFetchUser } from "../../lib/authContext";

export default function supervisorn() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Admin">
      <LayoutSupervisor>Bienvenido Administrador!!!</LayoutSupervisor>
    </Layout>
  );
}