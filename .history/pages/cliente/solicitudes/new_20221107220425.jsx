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
  const uo = typeof window !== "undefined" ? getUOFromLocalCookie() : "";
  const router = useRouter();
  const [inmueble, setInmueble] = useState({
    descripcion: "",
    direccion: "",
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles`,
        {
          method: "POST",
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

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../">
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
                    Adicionar Inmueble
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
                  placeholder="Descripci&oacute;n"
                />
                <Input
                  name="direccion"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Direcci&oacute;n"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button auto onClick={closeHandler} color="error">
                  Cancelar
                </Button>
                <Button auto onClick={handleSubmit} color="success">
                  Adicionar
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
