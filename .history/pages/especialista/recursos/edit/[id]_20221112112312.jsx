/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useFetchUser } from "../../../../lib/authContext";
import { Layout } from "../../../../components";
import LayoutEspecialista from "../../../../components/especialista/LayoutEspecialista";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUOFromLocalCookie,
} from "../../../../lib/auth";
import { fetcher } from "../../../../lib/api";

export default function editPage() {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  
  const router = useRouter();
  const [recurso, setRecurso] = useState({
    id: "",
    codigo: "",
    nomenclador: "",
    precio: "",
    libreutilizacion: ""
  });

  const closeHandler = () => {
    router.push("/especialista/recursos");
  };

  const handleChange = (e) => {
    setRecurso({ ...recurso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos/${recurso.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: recurso }),
        }
      );
      router.push("/especialista/recursos");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadRecurso = async (pid) => {
    try {
      const recurso_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos/${pid}?populate[0]=demanda_recursos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setRecurso({
        id: recurso_loaded.data.id,
        codigo: recurso_loaded.data.attributes.codigo,
        nomenclador: recurso_loaded.data.attributes.nomenclador,
        precio: recurso_loaded.data.attributes.precio,
        libreutilizacion: recurso_loaded.data.attributes.libreutilizacion,
      });
    } catch (error) {
      router.push("/especialista/recursos");
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadRecurso(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../../">
      <LayoutEspecialista>
        <>
          {uo ? (
            
          ) : (
            <h3>
              Usted no tiene asignado ninguna Unidad Organizativa, por favor
              contacte con su Administrador
            </h3>
          )}
        </>
      </LayoutEspecialista>
    </Layout>
  );
}
