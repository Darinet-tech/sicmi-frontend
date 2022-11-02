/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Authentication, Layout } from "../../../components";
import LayoutAdmin from "../../../components/admin/LayoutAdmin";

import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../lib/auth";
import { useFetchUser } from "../../../lib/authContext";
import { fetcher } from "../../../lib/api";

export default function newPage({ roles, uos }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();
  
  const [Usuario, setUsuario] = React.useState({
    username: "",
    email: "",
    role: "",
    unidadorganizativa: "",
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/usuarios`,
        {
          method: "POST",
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

  return (
    <Layout user={user} titulo="Admin" baseURL="./../../">
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
                      Agregar Usuario
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
                    placeholder="Cargo"
                  />

                  <select name="role" onChange={handleChange}>
                    {roles &&
                      roles.data.map((ccItem) => {
                        return (
                          <option key={ccItem.id} value={ccItem.id}>
                            {" "}
                            {ccItem.name}{" "}
                          </option>
                        );
                      })}
                  </select>

                  <select name="unidadorganizativa" onChange={handleChange}>
                    {uos &&
                      uos.data.map((ccItem) => {
                        return (
                          <option key={ccItem.id} value={ccItem.id}>
                            {" "}
                            {ccItem.nombre}{" "}
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
                    Agregar
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/role`,
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
      role: centrosResponse,
    },
  };
}
