/* eslint-disable react-hooks/rules-of-hooks */
import { Layout } from "../../components";
import LayoutDirector from "../../components/director/LayoutDirector";
import { useFetchUser } from "../../lib/authContext";

export default function director() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Director">
      <LayoutDirector>Bienvenido Director!!!</LayoutDirector>
    </Layout>
  );
}
