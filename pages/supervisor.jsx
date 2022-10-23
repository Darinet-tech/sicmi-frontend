import { Layout } from "../components";
import { useFetchUser } from '../lib/authContext';

export default function Supervisor() {
  const { user, loading } = useFetchUser();
  return <Layout user={user} titulo="Supervisor" mostrar="supervisor"></Layout>;
}
