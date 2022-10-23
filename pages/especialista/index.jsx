import { Layout } from "../../components";
import { useFetchUser } from '../../lib/authContext';


export default function especialista() {
  const { user, loading } = useFetchUser();
  return(
    <Layout user={user} titulo="Especialista" mostrar="especialista">      
    </Layout>
  );
}


