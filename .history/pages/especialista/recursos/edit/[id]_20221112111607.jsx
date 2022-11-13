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
    unidadorganizativa: uo,
  });

  const closeHandler = () => {
    router.push("/especialista/inmuebles");
  };

  const handleChange = (e) => {
    setInmueble({ ...inmueble, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles/${inmueble.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: inmueble }),
        }
      );
      router.push("/especialista/inmuebles");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadInmueble = async (pid) => {
    try {
      const inmueble_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles/${pid}?populate[0]=centrodecosto`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setInmueble({
        id: inmueble_loaded.data.id,
        descripcion: inmueble_loaded.data.attributes.descripcion,
        direccion: inmueble_loaded.data.attributes.direccion,
      });
    } catch (error) {
      router.push("/especialista/inmuebles");
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadInmueble(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../../">
      <LayoutEspecialista>
        <>
          {uo ? (
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={true}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  <Text b size={18}>
                    Editar Inmueble
                  </Text>
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Input
                  name="descripcion"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={inmueble.descripcion}
                />
                <Input
                  name="direccion"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={inmueble.direccion}
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
