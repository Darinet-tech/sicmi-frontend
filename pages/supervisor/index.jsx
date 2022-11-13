/* eslint-disable react-hooks/rules-of-hooks */
import { Layout } from "../../components";
import LayoutSupervisor from "../../components/supervisor/LayoutSupervisor";
import { useFetchUser } from "../../lib/authContext";

export default function supervisor() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Supervisor">
      <LayoutSupervisor>Bienvenido Supervisor!!!</LayoutSupervisor>
    </Layout>
  );
}
