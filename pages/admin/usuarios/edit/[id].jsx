/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useFetchUser } from "../../../../lib/authContext";
import { Authentication, Layout } from "../../../../components";
import LayoutAdmin from "../../../../components/admin/LayoutAdmin";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../../lib/auth";
import { fetcher } from "../../../../lib/api";

export default function editPage({ roles, uos }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    id: "",
    username: "",
    email: "",
    role: roles.length > 0 ? roles[0].id : "",
    unidadorganizativa: uos.data.length > 0 ? uos.data[0].id : "",
    cargo: "",
    blocked: false,
    confirmed: true,
    provider: "local",
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${usuario.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(usuario),
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${pid}?populate[0]=role&populate[1]=unidadorganizativa`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setUsuario({
        id: usuario_loaded.id,
        username: usuario_loaded.username,
        email: usuario_loaded.email,
        cargo: usuario_loaded.cargo,
        blocked: usuario_loaded.blocked,
        confirmed: usuario_loaded.confirmed,
        provider: "local",
        role: usuario_loaded.role ? usuario_loaded.role.id : "",
        unidadorganizativa: usuario_loaded.unidadorganizativa
          ? usuario_loaded.unidadorganizativa.id
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
                name="username"
                onChange={handleChange}
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                value={usuario.username}
                placeholder="Usuario"
              />
              <Input
                name="email"
                onChange={handleChange}
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                value={usuario.email}
                placeholder="Correo"
              />
              <Input
                name="cargo"
                onChange={handleChange}
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                value={usuario.cargo}
                placeholder="Cargo"
              />
              <label>Rol</label>
              <select
                name="role"
                onChange={handleChange}
                value={usuario.role}
                className="dropdown-dark"
              >
                {Array.isArray(roles.roles) &&
                  roles.roles.map((ccItem) => {
                    return (
                      <option key={ccItem.id} value={ccItem.id}>
                        {" "}
                        {ccItem.name}{" "}
                      </option>
                    );
                  })}
              </select>
              <label>Unidad organizativa</label>
              <select
                name="unidadorganizativa"
                onChange={handleChange}
                value={usuario.unidadorganizativa}
                className="dropdown-dark"
              >
                {Array.isArray(uos.data) &&
                  uos.data.map((ccItem) => {
                    return (
                      <option key={ccItem.id} value={ccItem.id}>
                        {" "}
                        {ccItem.attributes.acronimo} {ccItem.attributes.nombre}
                      </option>
                    );
                  })}
              </select>
              <Checkbox
                name="confirmed"
                color="success"
                defaultSelected={usuario.confirmed}
                onChange={(newvalue) => {
                  setUsuario({ ...usuario, ["confirmed"]: newvalue });
                }}
              >
                Confirmado
              </Checkbox>
              <Checkbox
                name="blocked"
                color="error"
                defaultSelected={usuario.blocked}
                onChange={(newvalue) => {
                  setUsuario({ ...usuario, ["blocked"]: newvalue });
                }}
              >
                Bloqueado
              </Checkbox>
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
      </LayoutAdmin>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const rolesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users-permissions/roles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const uoResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/unidadorganizativas`,
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
      roles: rolesResponse,
      uos: uoResponse,
    },
  };
}
