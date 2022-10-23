import { Formulario, Layout, Seleccionar } from "../components";
import { useFetchUser } from '../lib/authContext';


export default function cliente() {
  const { user, loading } = useFetchUser();

  return <Layout user={user} titulo="Cliente" mostrar="cliente">
   
  </Layout>
  
}
