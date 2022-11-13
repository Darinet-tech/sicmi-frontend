/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Layout } from "../../../components";
import LayoutEspecialista from "../../../components/especialista/LayoutEspecialista";

import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUOFromLocalCookie,
} from "../../../lib/auth";
import { useFetchUser } from "../../../lib/authContext";
import { fetcher } from "../../../lib/api";

export default function newPage() {
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos`,
        {
          method: "POST",
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

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../">
      <LayoutEspecialista>
        <>
          
        </>
      </LayoutEspecialista>
    </Layout>
  );
}
