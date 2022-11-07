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
  getUOFromServerCookie,
} from "../../../../lib/auth";
import { fetcher } from "../../../../lib/api";

export default function editPage({ areas, inmuebles }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const uo = typeof window !== "undefined" ? getUOFromLocalCookie() : "";
  const router = useRouter();
  const [local, setLocal] = useState({
    id: "",
    nombre: "",
    arearesponsable: null,
    inmueble: null,
  });

  const closeHandler = () => {
    router.push("/especialista/locales");
  };

  const handleChange = (e) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/locals/${local.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: local }),
        }
      );
      router.push("/especialista/locales");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadlocal = async (pid) => {
    try {
      const local_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/locals/${pid}?populate[0]=arearesponsable&populate[1]=inmueble`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setLocal({
        id: local_loaded.data.id,
        nombre: local_loaded.data.attributes.nombre,
        arearesponsable: local_loaded.data.attributes.arearesponsable.data
          ? local_loaded.data.attributes.arearesponsable.data.id
          : null,
        inmueble: local_loaded.data.attributes.inmueble.data
          ? local_loaded.data.attributes.inmueble.data.id
          : null,
      });
    } catch (error) {
      router.push("/especialista/locales");
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadlocal(router.query.id);
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
                    Editar Local
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
                  value={local.nombre}
                />
                <label>Inmueble</label>
                <select
                  name="inmueble"
                  onChange={handleChange}
                  value={local.inmueble}
                  className="dropdown-dark"
                >
                  <option>Seleccione un inmueble</option>
                  {inmuebles &&
                    inmuebles.data &&
                    inmuebles.data.map((ccItem) => {
                      return (
                        <option key={ccItem.id} value={ccItem.id}>
                          {" "}
                          {ccItem.attributes.descripcion}{" "}
                        </option>
                      );
                    })}
                </select>
                <label>Area Responsable</label>
                <select
                  name="arearesponsable"
                  onChange={handleChange}
                  value={local.arearesponsable}
                  className="dropdown-dark"
                >
                  <option>Seleccione un Area Responsable</option>
                  {areas &&
                    areas.data &&
                    areas.data.map((ccItem) => {
                      return (
                        <option key={ccItem.id} value={ccItem.id}>
                          {" "}
                          {ccItem.attributes.nombre}{" "}
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

  const areasResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/areas?filters[unidadorganizativa][id][$eq]=${uo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const inmueblesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?filters[unidadorganizativa][id][$eq]=${uo}`,
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
      areas: areasResponse,
      inmuebles: inmueblesResponse,
    },
  };
}
