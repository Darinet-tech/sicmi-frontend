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

export default function editPage({ centrodecostos }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const uo = typeof window !== "undefined" ? getUOFromLocalCookie() : "";
  const router = useRouter();
  const [inmueble, setInmueble] = useState({
    id: "",
    descripcion: "",
    direccion: "",
    centrodecosto: "",
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
        centrodecosto: inmueble_loaded.data.attributes.centrodecosto.data
          ? inmueble_loaded.data.attributes.centrodecosto.data.id
          : "",
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
                <label>Centro de costo</label>
                <select
                  name="centrodecosto"
                  onChange={handleChange}
                  value={inmueble.centrodecosto}
                  className="dropdown-dark"
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
