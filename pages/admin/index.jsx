/* eslint-disable react-hooks/rules-of-hooks */

import { Layout } from "../../components";
import LayoutAdmin from "../../components/admin/LayoutAdmin";
import { useFetchUser } from "../../lib/authContext";

export default function admin() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo="Admin">
      <LayoutAdmin>Bienvenido Administrador!!!</LayoutAdmin>
    </Layout>
  );
}
