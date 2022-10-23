import { Layout, } from "../components";
import { useFetchUser } from '../lib/authContext';

export default function SesionAdmin() {
  const { user, loading } = useFetchUser();
  return <Layout  user={user} titulo="Admin" mostrar="admin"></Layout>;
}
