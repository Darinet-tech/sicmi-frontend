/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useFetchUser } from "../../../../lib/authContext";
import { Layout } from "../../../../components";
import LayoutAdmin from "../../../../components/admin/LayoutAdmin";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUOFromLocalCookie,
  getUOFromServerCookie,
} from "../../../../lib/auth";
import { fetcher } from "../../../../lib/api";

export default function editPage({ inmuebles }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const uo = typeof window !== "undefined" ? getUOFromLocalCookie() : "";
  const router = useRouter();
  const [unidadorganizativa, setUnidadorganizativa] = useState({
    id: "",
    nombre: "",
    acronimo: "",        
  });

  const closeHandler = () => {
    router.push("/admin/unidads");
  };

  const handleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/areas/${area.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: area }),
        }
      );
      router.push("/especialista/areas");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadarea = async (pid) => {
    try {
      const area_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/areas/${pid}?populate[0]=responsable`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setArea({
        id: area_loaded.data.id,
        nombre: area_loaded.data.attributes.nombre,
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
