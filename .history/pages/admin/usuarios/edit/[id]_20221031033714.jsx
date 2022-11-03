/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useFetchUser } from "../../../../lib/authContext";
import { Authentication, Layout } from "../../../../components";
import LayoutEspecialista from "../../../../components/especialista/LayoutEspecialista";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../../lib/auth";
import { fetcher } from "../../../../lib/api";

export default function editPage({ centrodecostos }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();
  const [inmueble, setInmueble] = useState({
    id: "",
    nombre: "",
    email: "",
    cargo: "",
  });

  const closeHandler = () => {
    router.push("/admin/usuarios");
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/usuarios/${usuario.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: usuario }),
        }
      );
      router.push("/admin/usuarios");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadUsuario = async (pid) => {
    try {
      const usuario_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/usuarios/${pid}?populate[0]=centrodecosto`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setUsuario({
        id: usuario_loaded.data.id,
        nombre: usuario_loaded.data.attributes.nombre,
        email: usuario_loaded.data.attributes.email,
        cargo: usuario_loaded.data.attributes.email.data
          ? usuario_loaded.data.attributes.centrodecosto.data.id
          : "",
      });
    } catch (error) {
      router.push("/admin/usuarios");
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadUsuario(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout user={user} titulo="Admin" baseURL="./../../../">
      <LayoutAdmin>
        {!loading &&
          (user ? (
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
                      Editar Usuario
                    </Text>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    name="nombre"
                    onChange={handleChange}
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    value={usuario.nombre}
                  />
                  <Input
                    name="email"
                    onChange={handleChange}
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    value={inmueble.direccion}
                  />
                  <select
                    name="centrodecosto"
                    onChange={handleChange}
                    value={inmueble.centrodecosto}
                  >
                    {centrodecostos &&
                      centrodecostos.data.map((ccItem) => {
                        return (
                          <option key={ccItem.id} value={ccItem.id}>
                            {" "}
                            {ccItem.attributes.centrocosto}{" "}
                          </option>
                        );
                      })}
                  </select>
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onClick={closeHandler}>
                    Cancelar
                  </Button>
                  <Button auto onClick={handleSubmit}>
                    Salvar
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <main>
              <Authentication />
            </main>
          ))}
      </LayoutAdmin>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const centrosResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/centrodecostos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return {
    props: {
      centrodecostos: centrosResponse,
    },
  };
}
