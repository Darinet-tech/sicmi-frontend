import { Layout } from "../components";
import { useFetchUser } from '../lib/authContext';

export default function JefeBrigada() {
  const { user, loading } = useFetchUser();
  return <Layout  user={user}  titulo="Jefe de Brigada" mostrar="jefebrigada"></Layout>;
}
