import { Layout } from "../../components";
import LayoutDirector from "../../components/LayoutDirector";
import { useFetchUser } from "../../lib/authContext";

export default function director() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Cliente">
      <LayoutDirector>Bienvenido Cliente!!!</LayoutDirector>
    </Layout>
  );
}