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
    libreutilizacion: "",
    
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos/${pid}`,
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
        <Modal
              closeButton
              aria-labelledby="modal-title"
              open={true}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  <Text b size={18}>
                    Editar Recurso
                  </Text>
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Input
                  name="codigo"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={recurso.codigo}
                />
                <Input
                  name="nomenclador"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={recurso.nomenclador}
                />
                <Input
                  name="precio"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={recurso.precio}
                />
                <Input
                  name="libreutilizacion"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={recurso.libreutilizacion}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button auto color="error" onClick={closeHandler}>
                  Cancelar
                </Button>
                <Button auto onClick={handleSubmit}>
                  Salvar
                </Button>
              </Modal.Footer>
            </Modal>
        </>
      </LayoutEspecialista>
    </Layout>
  );
}
