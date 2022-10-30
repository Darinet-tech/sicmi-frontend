import { Layout } from "../../components";
import LayoutDirector from "../../components/LayoutDirector";
import { useFetchUser } from "../../lib/authContext";

export default function director() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Director">
      <LayoutDirector>Bienvenido Director!!!</LayoutDirector>
    </Layout>
  );
}