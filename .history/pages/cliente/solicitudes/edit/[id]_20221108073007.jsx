/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useFetchUser } from "../../../../lib/authContext";
import { Layout } from "../../../../components";
import LayoutCliente from "../../../../components/cliente/LayoutCliente";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUOFromLocalCookie,
  getUOFromServerCookie,
} from "../../../../lib/auth";
import { fetcher } from "../../../../lib/api";

export default function editPage() {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  //const uo = typeof window !== "undefined" ? getUOFromLocalCookie() : "";
  const router = useRouter();
  const [solicitud, setSolicitud] = useState({
    id: "",
    descripcion: "",
    fecha_ini: "", // no sé si se pone así
    fecha_fin: "", // no sé si se pone así
    unidadorganizativa: uo,
  });

  const closeHandler = () => {
    router.push("/cliente/solicitudes");
  };

  const handleChange = (e) => {
    setSolicitud({ ...solicitud, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes/${solicitud.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: area }),
        }
      );
      router.push("/cliente/solicitudes");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadsolicitud = async (pid) => {
    try {
      const solicitud_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes/${pid}?populate[0]=elaboradopor`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setSolicitud({
        id: solicitud_loaded.data.id,
        descripcion: solicitud_loaded.data.attributes.de,
        centrodecosto: area_loaded.data.attributes.centrodecosto,
        responsable: area_loaded.data.attributes.responsable.data
          ? area_loaded.data.attributes.responsable.data.id
          : "",
      });
    } catch (error) {
      router.push("/especialista/areas");
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadarea(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../../">
      <LayoutCliente>
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
                    Editar Area
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
                  value={area.nombre}
                />
                <label>Responsable</label>
                <select
                  name="responsable"
                  onChange={handleChange}
                  value={area.responsable}
                  className="dropdown-dark"
                >
                  <option>Seleccione un responsable</option>
                  {responsables &&
                    responsables.map((ccItem) => {
                      return (
                        <option key={ccItem.id} value={ccItem.id}>
                          {" "}
                          {ccItem.username}{" "}
                        </option>
                      );
                    })}
                </select>
                <Input
                  name="centrodecosto"
                  onChange={handleChange}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={area.centrodecosto}
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
      </LayoutCliente>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);
  const uo =
    typeof window !== "undefined"
      ? getUOFromLocalCookie()
      : getUOFromServerCookie(req);

  const responsablesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?filters[role][name][$eq]=Cliente&filters[unidadorganizativa][id][$eq]=${uo}`,
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
      responsables: responsablesResponse,
    },
  };
}
