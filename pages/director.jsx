import { Layout } from "../components";
import { useFetchUser } from '../lib/authContext';


export default function Director() {
  const { user, loading } = useFetchUser();
  return <Layout user={user}  titulo="Director" mostrar="director"></Layout>;
}
