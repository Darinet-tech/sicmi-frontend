import { Layout } from "../components"
import { useFetchUser } from '../lib/authContext';


export default function Home() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} titulo='Autenticación'>      
    </Layout>
  );
}
 